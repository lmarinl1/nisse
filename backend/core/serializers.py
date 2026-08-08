from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Profile, Study, ensure_profile

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
