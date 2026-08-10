from datetime import date

from django.conf import settings
from django.db import models
from django.db import transaction


class Profile(models.Model):
    """Product identity for an authenticated Diseñador de Futuros."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    first_name = models.CharField(max_length=100, blank=True, default="")
    last_name = models.CharField(max_length=150, blank=True, default="")
    role_title = models.CharField(max_length=150, blank=True, default="")
    country_code = models.CharField(max_length=8, blank=True, default="")
    phone = models.CharField(max_length=32, blank=True, default="")
    # Convenience display; prefer first_name for chrome. Kept for older clients.
    display_name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_name", "first_name"]

    def __str__(self) -> str:
        label = (self.first_name or self.display_name or "").strip()
        return label or str(self.user)

    def sync_display_name(self) -> None:
        """Keep display_name aligned with first_name (or username fallback)."""
        first = (self.first_name or "").strip()
        if first:
            self.display_name = first
        elif not (self.display_name or "").strip():
            username = getattr(self.user, "get_username", lambda: "")() or ""
            self.display_name = username.strip()


def ensure_profile(user) -> Profile:
    """Guarantee exactly one Profile per authenticated user."""
    profile, created = Profile.objects.get_or_create(user=user)
    if created:
        # Do not invent personal names; leave work fields empty until Settings.
        profile.sync_display_name()
        profile.save(update_fields=["display_name", "updated_at"])
    return profile


class Study(models.Model):
    """Aggregate Root for a research investigation (UI: Objeto de Estudio)."""

    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        ARCHIVED = "archived", "Archived"

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="studies",
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self) -> str:
        return self.name

    def archive(self) -> None:
        self.status = self.Status.ARCHIVED
        self.save(update_fields=["status", "updated_at"])


# Domain field keys per Case Framework section (source of truth for validation).
CASE_FRAMEWORK_SECTION_FIELDS: dict[str, tuple[str, ...]] = {
    "conceptual-evolution": (
        "initial_intuition",
        "conceptual_shifts",
        "theoretical_methodological_decisions",
        "thought_evolution",
    ),
    "theoretical-framework": (
        "theoretical_conversations",
        "interlocutor_contributions",
        "tensions_disagreements",
        "reinterpretations_shifts",
        "approach_crossings",
    ),
    "fundamental-concepts": (
        "fundamental_concepts",
        "concept_relations",
        "inherited_resignified_concepts",
    ),
    "tensions": (
        "main_tensions",
        "tension_origins",
        "tension_productivity",
        "unresolved_tensions",
    ),
    "consolidated-object": (
        "object_definition",
        "field_delimitation",
        "differentiation",
        "relation_to_prior",
        "object_current_state",
    ),
}

CASE_FRAMEWORK_SECTION_ORDER: tuple[str, ...] = tuple(
    CASE_FRAMEWORK_SECTION_FIELDS.keys()
)


def empty_section_fields(section_type: str) -> dict[str, str]:
    keys = CASE_FRAMEWORK_SECTION_FIELDS.get(section_type, ())
    return {key: "" for key in keys}


def derive_section_status(fields: dict, reviewed: bool, section_type: str) -> str:
    if reviewed:
        return "reviewed"
    keys = CASE_FRAMEWORK_SECTION_FIELDS.get(section_type, ())
    if not keys:
        return "not_started"
    filled = 0
    for key in keys:
        value = fields.get(key, "") if isinstance(fields, dict) else ""
        if isinstance(value, str) and value.strip():
            filled += 1
    if filled == 0:
        return "not_started"
    if filled < len(keys):
        return "in_progress"
    return "with_content"


class CaseFramework(models.Model):
    """Research instrument: progressive construction of the study object."""

    study = models.OneToOneField(
        Study,
        on_delete=models.CASCADE,
        related_name="case_framework",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self) -> str:
        return f"CaseFramework({self.study_id})"


class CaseFrameworkSection(models.Model):
    """One of five Case Framework sections with Markdown fields."""

    class SectionType(models.TextChoices):
        CONCEPTUAL_EVOLUTION = "conceptual-evolution", "Conceptual evolution"
        THEORETICAL_FRAMEWORK = "theoretical-framework", "Theoretical framework"
        FUNDAMENTAL_CONCEPTS = "fundamental-concepts", "Fundamental concepts"
        TENSIONS = "tensions", "Tensions"
        CONSOLIDATED_OBJECT = "consolidated-object", "Consolidated object"

    case_framework = models.ForeignKey(
        CaseFramework,
        on_delete=models.CASCADE,
        related_name="sections",
    )
    section_type = models.CharField(
        max_length=40,
        choices=SectionType.choices,
    )
    fields = models.JSONField(default=dict, blank=True)
    reviewed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["section_type"]
        constraints = [
            models.UniqueConstraint(
                fields=["case_framework", "section_type"],
                name="uniq_case_framework_section_type",
            ),
        ]

    def __str__(self) -> str:
        return f"{self.section_type}@{self.case_framework_id}"


def ensure_case_framework(study: Study) -> CaseFramework:
    """Guarantee one Case Framework with five empty sections for a Study."""
    framework, _created = CaseFramework.objects.get_or_create(study=study)
    existing = set(
        framework.sections.values_list("section_type", flat=True),
    )
    to_create = []
    for section_type in CASE_FRAMEWORK_SECTION_ORDER:
        if section_type not in existing:
            to_create.append(
                CaseFrameworkSection(
                    case_framework=framework,
                    section_type=section_type,
                    fields=empty_section_fields(section_type),
                    reviewed=False,
                )
            )
    if to_create:
        CaseFrameworkSection.objects.bulk_create(to_create)
    return framework


def compute_temporal_sort_key(
    year: int,
    month: int | None = None,
    day: int | None = None,
) -> int:
    """Stable chronological key. Year 0 is invalid; BCE years are negative."""
    if year == 0:
        raise ValueError("Year 0 is not valid; use -1 for 1 BCE.")
    m = month if month is not None else 1
    d = day if day is not None else 1
    # Offset so BCE sorts before CE without colliding on abs(year).
    return year * 10000 + m * 100 + d


class Timeline(models.Model):
    """Temporal research line within a Study (UI: Línea de tiempo)."""

    class Classification(models.TextChoices):
        REAL = "real", "Real"
        FICTIONAL = "fictional", "Fictional"

    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        ARCHIVED = "archived", "Archived"

    study = models.ForeignKey(
        Study,
        on_delete=models.CASCADE,
        related_name="timelines",
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    classification = models.CharField(
        max_length=20,
        choices=Classification.choices,
        default=Classification.REAL,
    )
    retrospective_year = models.IntegerField()
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE,
    )
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_default", "name"]

    def __str__(self) -> str:
        return self.name

    def archive(self) -> None:
        self.status = self.Status.ARCHIVED
        self.save(update_fields=["status", "updated_at"])

    def restore(self) -> None:
        self.status = self.Status.ACTIVE
        self.save(update_fields=["status", "updated_at"])


class Recall(models.Model):
    """Temporal event / Recuerdo on one or more timelines."""

    class Classification(models.TextChoices):
        VERIFIED = "verified", "Verified"
        APPROXIMATE = "approximate", "Approximate"
        HYPOTHETICAL = "hypothetical", "Hypothetical"
        FICTION = "fiction", "Fiction"

    study = models.ForeignKey(
        Study,
        on_delete=models.CASCADE,
        related_name="recalls",
    )
    home_timeline = models.ForeignKey(
        Timeline,
        on_delete=models.CASCADE,
        related_name="home_recalls",
    )
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=300, blank=True, default="")
    description_markdown = models.TextField()
    classification = models.CharField(
        max_length=20,
        choices=Classification.choices,
    )
    temporal_year = models.IntegerField()
    temporal_month = models.PositiveSmallIntegerField(null=True, blank=True)
    temporal_day = models.PositiveSmallIntegerField(null=True, blank=True)
    sort_key = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_key", "created_at"]

    def __str__(self) -> str:
        return self.title

    def recompute_sort_key(self) -> None:
        self.sort_key = compute_temporal_sort_key(
            self.temporal_year,
            self.temporal_month,
            self.temporal_day,
        )


class Moment(models.Model):
    """Contextual fragment attached to a Recuerdo."""

    recall = models.ForeignKey(
        Recall,
        on_delete=models.CASCADE,
        related_name="moments",
    )
    title = models.CharField(max_length=200)
    content_markdown = models.TextField(blank=True, default="")
    type = models.CharField(max_length=80, blank=True, default="note")
    reference = models.CharField(max_length=500, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self) -> str:
        return self.title


class TimelineCollapse(models.Model):
    """Shared Recuerdo identity across two or more timelines."""

    study = models.ForeignKey(
        Study,
        on_delete=models.CASCADE,
        related_name="timeline_collapses",
    )
    recall = models.ForeignKey(
        Recall,
        on_delete=models.CASCADE,
        related_name="collapses",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"Collapse({self.recall_id})"


class TimelineCollapseMember(models.Model):
    collapse = models.ForeignKey(
        TimelineCollapse,
        on_delete=models.CASCADE,
        related_name="members",
    )
    timeline = models.ForeignKey(
        Timeline,
        on_delete=models.CASCADE,
        related_name="collapse_memberships",
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["collapse", "timeline"],
                name="uniq_collapse_timeline_member",
            ),
        ]

    def __str__(self) -> str:
        return f"Member({self.collapse_id},{self.timeline_id})"


def create_principal_timeline(study: Study) -> Timeline:
    """Create the default Timeline named after the Study."""
    return Timeline.objects.create(
        study=study,
        name=study.name,
        description="",
        classification=Timeline.Classification.REAL,
        retrospective_year=date.today().year,
        status=Timeline.Status.ACTIVE,
        is_default=True,
    )


def ensure_principal_timeline(study: Study) -> Timeline:
    existing = Timeline.objects.filter(study=study, is_default=True).first()
    if existing:
        return existing
    return create_principal_timeline(study)


def recalls_for_timeline(timeline: Timeline):
    """Recalls whose home is this timeline or that collapse onto it."""
    collapse_ids = TimelineCollapseMember.objects.filter(
        timeline=timeline,
    ).values_list("collapse_id", flat=True)
    collapse_recall_ids = TimelineCollapse.objects.filter(
        id__in=collapse_ids,
    ).values_list("recall_id", flat=True)
    return (
        Recall.objects.filter(study=timeline.study)
        .filter(
            models.Q(home_timeline=timeline)
            | models.Q(id__in=collapse_recall_ids)
        )
        .distinct()
        .order_by("sort_key", "created_at")
    )


def recall_visible_timeline_ids(recall: Recall) -> list:
    ids = {str(recall.home_timeline_id)}
    for collapse in recall.collapses.prefetch_related("members").all():
        for member in collapse.members.all():
            ids.add(str(member.timeline_id))
    return sorted(ids)


@transaction.atomic
def delete_timeline_hard(timeline: Timeline) -> None:
    """Permanently delete an archived non-default timeline with cascade rules."""
    if timeline.is_default:
        raise ValueError("La línea principal no puede eliminarse definitivamente.")
    if timeline.status != Timeline.Status.ARCHIVED:
        raise ValueError("Solo se pueden eliminar líneas archivadas.")

    # Dissolve collapses that include this timeline.
    memberships = list(
        TimelineCollapseMember.objects.filter(timeline=timeline).select_related(
            "collapse",
        )
    )
    for membership in memberships:
        collapse = membership.collapse
        membership.delete()
        remaining = collapse.members.count()
        if remaining < 2:
            # Remove collapse momentos and the collapse itself.
            Moment.objects.filter(
                recall=collapse.recall,
                type="collapse",
            ).delete()
            collapse.delete()

    # Delete recalls that only lived on this timeline (no remaining collapses).
    home_recalls = list(Recall.objects.filter(home_timeline=timeline))
    for recall in home_recalls:
        if recall.collapses.exists():
            # Re-home to another participating timeline if possible.
            other_member = (
                TimelineCollapseMember.objects.filter(collapse__recall=recall)
                .exclude(timeline=timeline)
                .select_related("timeline")
                .first()
            )
            if other_member:
                recall.home_timeline = other_member.timeline
                recall.save(update_fields=["home_timeline", "updated_at"])
            else:
                recall.delete()
        else:
            recall.delete()

    timeline.delete()


@transaction.atomic
def create_collapse(
    recall: Recall,
    timeline_ids: list[str],
) -> TimelineCollapse:
    timelines = list(
        Timeline.objects.filter(study=recall.study, id__in=timeline_ids),
    )
    if len(timelines) < 2:
        raise ValueError("Un colapso requiere al menos dos líneas de tiempo.")
    found_ids = {str(t.pk) for t in timelines}
    missing = set(str(i) for i in timeline_ids) - found_ids
    if missing:
        raise ValueError("Todas las líneas deben pertenecer al mismo Objeto de Estudio.")

    # Include home timeline always.
    if str(recall.home_timeline_id) not in found_ids:
        timelines.append(recall.home_timeline)

    collapse = TimelineCollapse.objects.create(study=recall.study, recall=recall)
    TimelineCollapseMember.objects.bulk_create(
        [
            TimelineCollapseMember(collapse=collapse, timeline=timeline)
            for timeline in timelines
        ]
    )
    Moment.objects.create(
        recall=recall,
        title="Colapso entre líneas de tiempo",
        content_markdown=(
            "Este recuerdo conecta: "
            + ", ".join(t.name for t in timelines)
        ),
        type="collapse",
        reference="",
    )
    return collapse

