from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Study, ensure_case_framework, ensure_profile
from .serializers import (
    CaseFrameworkSectionSerializer,
    CaseFrameworkSectionWriteSerializer,
    CaseFrameworkSerializer,
    LoginSerializer,
    ProfileSerializer,
    RegisterSerializer,
    StudySerializer,
    StudyWriteSerializer,
)


@api_view(["GET"])
@permission_classes([AllowAny])
def health(request):
    """Lightweight readiness probe for local tooling and the frontend."""
    return Response(
        {
            "status": "ok",
            "service": "nisse-backend",
            "api_version": "v1",
        }
    )


def _auth_payload(user, token: Token) -> dict:
    profile = ensure_profile(user)
    return {
        "token": token.key,
        "user": {
            "id": str(user.pk),
            "username": user.get_username(),
        },
        "profile": ProfileSerializer(profile).data,
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        return Response(_auth_payload(user, token), status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        ensure_profile(user)
        token, _ = Token.objects.get_or_create(user=user)
        return Response(_auth_payload(user, token))


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = ensure_profile(request.user)
        return Response(ProfileSerializer(profile).data)


class StudyListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        studies = Study.objects.filter(
            owner=request.user,
            status=Study.Status.ACTIVE,
        )
        return Response(StudySerializer(studies, many=True).data)

    def post(self, request):
        serializer = StudyWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        study = Study.objects.create(
            owner=request.user,
            name=serializer.validated_data["name"],
            description=serializer.validated_data.get("description", ""),
        )
        return Response(StudySerializer(study).data, status=status.HTTP_201_CREATED)


class StudyDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def _owned_study(self, request, pk) -> Study:
        return get_object_or_404(Study, pk=pk, owner=request.user)

    def get(self, request, pk):
        study = self._owned_study(request, pk)
        return Response(StudySerializer(study).data)

    def patch(self, request, pk):
        study = self._owned_study(request, pk)
        serializer = StudyWriteSerializer(study, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        for field, value in serializer.validated_data.items():
            setattr(study, field, value)
        study.save()
        return Response(StudySerializer(study).data)


class StudyArchiveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        study = get_object_or_404(Study, pk=pk, owner=request.user)
        study.archive()
        return Response(StudySerializer(study).data)


class CaseFrameworkDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        study = get_object_or_404(Study, pk=pk, owner=request.user)
        framework = ensure_case_framework(study)
        return Response(CaseFrameworkSerializer(framework).data)


class CaseFrameworkSectionPatchView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, section_type):
        study = get_object_or_404(Study, pk=pk, owner=request.user)
        framework = ensure_case_framework(study)
        section = get_object_or_404(
            framework.sections,
            section_type=section_type,
        )
        serializer = CaseFrameworkSectionWriteSerializer(
            data=request.data,
            context={"section": section},
        )
        serializer.is_valid(raise_exception=True)
        section = serializer.save()
        return Response(CaseFrameworkSectionSerializer(section).data)
