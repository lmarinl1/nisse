import re

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.validators import validate_email
from django.db import transaction
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import (
    CASE_FRAMEWORK_SECTION_FIELDS,
    CASE_FRAMEWORK_SECTION_ORDER,
    CaseFramework,
    CaseFrameworkSection,
    Moment,
    Profile,
    Recall,
    Study,
    Timeline,
    derive_section_status,
    ensure_profile,
    recall_visible_timeline_ids,
    recalls_for_timeline,
)

User = get_user_model()

COUNTRY_CODE_RE = re.compile(r"^\+\d{1,4}$")
PHONE_RE = re.compile(r"^\d{6,15}$")


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    username = serializers.CharField(required=True, max_length=150)
    email = serializers.EmailField(required=True, allow_blank=False)
    first_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    last_name = serializers.CharField(required=True, allow_blank=False, max_length=150)
    role_title = serializers.CharField(required=True, allow_blank=False, max_length=150)
    country_code = serializers.CharField(required=True, allow_blank=False, max_length=8)
    phone = serializers.CharField(required=True, allow_blank=False, max_length=32)
    display_name = serializers.CharField(read_only=True)
    theme_preference = serializers.ChoiceField(
        choices=Profile.ThemePreference.choices,
        required=False,
    )

    class Meta:
        model = Profile
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "role_title",
            "country_code",
            "phone",
            "display_name",
            "theme_preference",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "display_name", "created_at", "updated_at"]

    def to_representation(self, instance):
        user = instance.user
        theme = getattr(instance, "theme_preference", None) or Profile.ThemePreference.DARK
        return {
            "id": str(instance.pk),
            "username": user.get_username(),
            "email": getattr(user, "email", "") or "",
            "first_name": instance.first_name or "",
            "last_name": instance.last_name or "",
            "role_title": instance.role_title or "",
            "country_code": instance.country_code or "",
            "phone": instance.phone or "",
            "display_name": instance.display_name or "",
            "theme_preference": theme,
            "created_at": instance.created_at.isoformat().replace("+00:00", "Z"),
            "updated_at": instance.updated_at.isoformat().replace("+00:00", "Z"),
        }

    def validate_theme_preference(self, value: str) -> str:
        allowed = {c.value for c in Profile.ThemePreference}
        if value not in allowed:
            raise serializers.ValidationError(
                "La preferencia de tema debe ser light, dark o system."
            )
        return value

    def validate_first_name(self, value: str) -> str:
        name = (value or "").strip()
        if not name:
            raise serializers.ValidationError("El nombre es obligatorio.")
        return name

    def validate_last_name(self, value: str) -> str:
        name = (value or "").strip()
        if not name:
            raise serializers.ValidationError("Los apellidos son obligatorios.")
        return name

    def validate_role_title(self, value: str) -> str:
        title = (value or "").strip()
        if not title:
            raise serializers.ValidationError("El cargo es obligatorio.")
        return title

    def validate_country_code(self, value: str) -> str:
        code = (value or "").strip()
        if not COUNTRY_CODE_RE.match(code):
            raise serializers.ValidationError(
                "El country code debe tener formato internacional (ej. +57)."
            )
        return code

    def validate_phone(self, value: str) -> str:
        raw = (value or "").strip().replace(" ", "").replace("-", "")
        if not PHONE_RE.match(raw):
            raise serializers.ValidationError(
                "El celular debe tener entre 6 y 15 dígitos."
            )
        return raw

    def validate_email(self, value: str) -> str:
        email = (value or "").strip()
        if not email:
            raise serializers.ValidationError("El correo electrónico es obligatorio.")
        try:
            validate_email(email)
        except DjangoValidationError as exc:
            raise serializers.ValidationError("El correo electrónico no es válido.") from exc
        user = self.instance.user if self.instance is not None else None
        qs = User.objects.filter(email__iexact=email)
        if user is not None:
            qs = qs.exclude(pk=user.pk)
        if qs.exists():
            raise serializers.ValidationError("Ese correo ya está en uso.")
        return email

    def validate_username(self, value: str) -> str:
        username = (value or "").strip()
        if not username:
            raise serializers.ValidationError("El username es obligatorio.")
        user = self.instance.user if self.instance is not None else None
        qs = User.objects.filter(username=username)
        if user is not None:
            qs = qs.exclude(pk=user.pk)
        if qs.exists():
            raise serializers.ValidationError("Ese username ya existe.")
        return username

    def update(self, instance, validated_data):
        username = validated_data.pop("username", None)
        email = validated_data.pop("email", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.sync_display_name()

        user = instance.user
        with transaction.atomic():
            if username is not None and user.get_username() != username:
                user.username = username
            if email is not None and (getattr(user, "email", "") or "") != email:
                user.email = email
            user.save()
            instance.save()
        return instance


class StudySerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Study
        fields = [
            "id",
            "name",
            "description",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "status", "created_at", "updated_at"]


class StudyWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = ["name", "description"]

    def validate_name(self, value: str) -> str:
        name = (value or "").strip()
        if not name:
            raise serializers.ValidationError("El nombre es obligatorio.")
        return name


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=8)

    def validate_username(self, value: str) -> str:
        username = value.strip()
        if not username:
            raise serializers.ValidationError("El usuario es obligatorio.")
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Ese usuario ya existe.")
        return username

    def validate_password(self, value: str) -> str:
        try:
            validate_password(value)
        except DjangoValidationError as exc:
            raise serializers.ValidationError(list(exc.messages)) from exc
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        ensure_profile(user)
        token, _ = Token.objects.get_or_create(user=user)
        return user, token


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(
            username=attrs["username"].strip(),
            password=attrs["password"],
        )
        if user is None:
            raise serializers.ValidationError("Credenciales inválidas.")
        if not user.is_active:
            raise serializers.ValidationError("Usuario inactivo.")
        attrs["user"] = user
        return attrs


class CaseFrameworkSectionSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    status = serializers.SerializerMethodField()

    class Meta:
        model = CaseFrameworkSection
        fields = [
            "id",
            "section_type",
            "fields",
            "reviewed",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields

    def get_status(self, obj: CaseFrameworkSection) -> str:
        fields = obj.fields if isinstance(obj.fields, dict) else {}
        return derive_section_status(fields, obj.reviewed, obj.section_type)


class CaseFrameworkSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    study_id = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()

    class Meta:
        model = CaseFramework
        fields = ["id", "study_id", "sections", "created_at", "updated_at"]
        read_only_fields = fields

    def get_study_id(self, obj: CaseFramework) -> str:
        return str(obj.study_id)

    def get_sections(self, obj: CaseFramework):
        by_type = {s.section_type: s for s in obj.sections.all()}
        ordered = [
            by_type[section_type]
            for section_type in CASE_FRAMEWORK_SECTION_ORDER
            if section_type in by_type
        ]
        return CaseFrameworkSectionSerializer(ordered, many=True).data


class CaseFrameworkSectionWriteSerializer(serializers.Serializer):
    fields = serializers.DictField(
        child=serializers.CharField(allow_blank=True),
        required=False,
    )
    reviewed = serializers.BooleanField(required=False)

    def validate(self, attrs):
        section: CaseFrameworkSection = self.context["section"]
        allowed = set(CASE_FRAMEWORK_SECTION_FIELDS[section.section_type])
        incoming = attrs.get("fields")
        if incoming is not None:
            unknown = set(incoming.keys()) - allowed
            if unknown:
                raise serializers.ValidationError(
                    {
                        "fields": (
                            "Claves no válidas para esta sección: "
                            + ", ".join(sorted(unknown))
                        )
                    }
                )
            cleaned = {}
            for key, value in incoming.items():
                cleaned[key] = value if isinstance(value, str) else str(value)
            attrs["fields"] = cleaned
        if "fields" not in attrs and "reviewed" not in attrs:
            raise serializers.ValidationError(
                "Indica fields y/o reviewed para actualizar la sección."
            )
        return attrs

    def save(self, **kwargs):
        section: CaseFrameworkSection = self.context["section"]
        fields_patch = self.validated_data.get("fields")
        if fields_patch is not None:
            current = (
                dict(section.fields) if isinstance(section.fields, dict) else {}
            )
            # Ensure all domain keys exist
            for key in CASE_FRAMEWORK_SECTION_FIELDS[section.section_type]:
                current.setdefault(key, "")
            current.update(fields_patch)
            section.fields = current
        if "reviewed" in self.validated_data:
            section.reviewed = self.validated_data["reviewed"]
        section.save()
        section.case_framework.save(update_fields=["updated_at"])
        return section


def _validate_year(year: int) -> int:
    if year == 0:
        raise serializers.ValidationError(
            "El año 0 no es válido; usa -1 para 1 a.C."
        )
    return year


class TimelineSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    study_id = serializers.SerializerMethodField()
    recall_count = serializers.SerializerMethodField()

    class Meta:
        model = Timeline
        fields = [
            "id",
            "study_id",
            "name",
            "description",
            "classification",
            "retrospective_year",
            "status",
            "is_default",
            "recall_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "study_id",
            "status",
            "is_default",
            "recall_count",
            "created_at",
            "updated_at",
        ]

    def get_study_id(self, obj: Timeline) -> str:
        return str(obj.study_id)

    def get_recall_count(self, obj: Timeline) -> int:
        return recalls_for_timeline(obj).count()


class TimelineWriteSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    description = serializers.CharField(required=False, allow_blank=True, default="")
    classification = serializers.ChoiceField(choices=Timeline.Classification.choices)
    retrospective_year = serializers.IntegerField()

    def validate_name(self, value: str) -> str:
        name = (value or "").strip()
        if not name:
            raise serializers.ValidationError("El nombre es obligatorio.")
        return name

    def validate_retrospective_year(self, value: int) -> int:
        return _validate_year(value)


class MomentSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)

    class Meta:
        model = Moment
        fields = [
            "id",
            "title",
            "content_markdown",
            "type",
            "reference",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class MomentWriteSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    content_markdown = serializers.CharField(required=False, allow_blank=True, default="")
    type = serializers.CharField(required=False, allow_blank=True, default="note", max_length=80)
    reference = serializers.CharField(required=False, allow_blank=True, default="", max_length=500)

    def validate_title(self, value: str) -> str:
        title = (value or "").strip()
        if not title:
            raise serializers.ValidationError("El título es obligatorio.")
        return title


class RecallSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    study_id = serializers.SerializerMethodField()
    home_timeline_id = serializers.SerializerMethodField()
    timeline_ids = serializers.SerializerMethodField()
    moments = MomentSerializer(many=True, read_only=True)
    is_collapse = serializers.SerializerMethodField()

    class Meta:
        model = Recall
        fields = [
            "id",
            "study_id",
            "home_timeline_id",
            "timeline_ids",
            "title",
            "location",
            "description_markdown",
            "classification",
            "temporal_year",
            "temporal_month",
            "temporal_day",
            "sort_key",
            "is_collapse",
            "moments",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields

    def get_study_id(self, obj: Recall) -> str:
        return str(obj.study_id)

    def get_home_timeline_id(self, obj: Recall) -> str:
        return str(obj.home_timeline_id)

    def get_timeline_ids(self, obj: Recall) -> list[str]:
        return recall_visible_timeline_ids(obj)

    def get_is_collapse(self, obj: Recall) -> bool:
        return obj.collapses.exists()


class RecallWriteSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    location = serializers.CharField(required=False, allow_blank=True, default="", max_length=300)
    description_markdown = serializers.CharField()
    classification = serializers.ChoiceField(choices=Recall.Classification.choices)
    temporal_year = serializers.IntegerField()
    temporal_month = serializers.IntegerField(required=False, allow_null=True, min_value=1, max_value=12)
    temporal_day = serializers.IntegerField(required=False, allow_null=True, min_value=1, max_value=31)

    def validate_title(self, value: str) -> str:
        title = (value or "").strip()
        if not title:
            raise serializers.ValidationError("El nombre es obligatorio.")
        return title

    def validate_description_markdown(self, value: str) -> str:
        text = (value or "").strip()
        if not text:
            raise serializers.ValidationError("La descripción es obligatoria.")
        return value

    def validate_temporal_year(self, value: int) -> int:
        return _validate_year(value)


class CollapseWriteSerializer(serializers.Serializer):
    timeline_ids = serializers.ListField(
        child=serializers.CharField(),
        min_length=1,
    )

