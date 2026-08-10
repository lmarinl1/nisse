from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import (
    CASE_FRAMEWORK_SECTION_FIELDS,
    CASE_FRAMEWORK_SECTION_ORDER,
    CaseFramework,
    CaseFrameworkSection,
    Profile,
    Study,
    derive_section_status,
    ensure_profile,
)

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "username", "display_name", "created_at", "updated_at"]
        read_only_fields = fields


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
