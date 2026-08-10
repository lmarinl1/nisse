from django.conf import settings
from django.db import models


class Profile(models.Model):
    """Product identity for an authenticated Diseñador de Futuros."""

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    display_name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_name"]

    def __str__(self) -> str:
        return self.display_name or str(self.user)


def ensure_profile(user) -> Profile:
    """Guarantee exactly one Profile per authenticated user."""
    display_name = (getattr(user, "get_username", lambda: "")() or "").strip()
    profile, _created = Profile.objects.get_or_create(
        user=user,
        defaults={"display_name": display_name},
    )
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
