from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Study, ensure_case_framework, ensure_principal_timeline, ensure_profile
from .serializers import (
    CaseFrameworkSectionSerializer,
    CaseFrameworkSectionWriteSerializer,
    CaseFrameworkSerializer,
    CollapseWriteSerializer,
    LoginSerializer,
    MomentSerializer,
    MomentWriteSerializer,
    ProfileSerializer,
    RecallSerializer,
    RecallWriteSerializer,
    RegisterSerializer,
    StudySerializer,
    StudyWriteSerializer,
    TimelineSerializer,
    TimelineWriteSerializer,
)
from .models import (
    Moment,
    Recall,
    Timeline,
    compute_temporal_sort_key,
    create_collapse,
    delete_timeline_hard,
    recalls_for_timeline,
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

    def patch(self, request):
        # Identity always comes from the authenticated session — ignore any
        # client-supplied user/profile id for selecting whose profile to mutate.
        profile = ensure_profile(request.user)
        serializer = ProfileSerializer(
            profile,
            data=request.data,
            partial=False,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


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
        from django.db import transaction

        from .models import create_principal_timeline

        with transaction.atomic():
            study = Study.objects.create(
                owner=request.user,
                name=serializer.validated_data["name"],
                description=serializer.validated_data.get("description", ""),
            )
            create_principal_timeline(study)
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


def _owned_study(request, pk) -> Study:
    return get_object_or_404(Study, pk=pk, owner=request.user)


def _owned_timeline(request, study_pk, timeline_pk) -> Timeline:
    study = _owned_study(request, study_pk)
    return get_object_or_404(Timeline, pk=timeline_pk, study=study)


def _owned_recall(request, study_pk, recall_pk) -> Recall:
    study = _owned_study(request, study_pk)
    return get_object_or_404(Recall, pk=recall_pk, study=study)


class TimelineListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        study = _owned_study(request, pk)
        ensure_principal_timeline(study)
        status_filter = request.query_params.get("status", "all")
        qs = Timeline.objects.filter(study=study)
        if status_filter in ("active", "archived"):
            qs = qs.filter(status=status_filter)
        qs = qs.order_by("-is_default", "name")
        return Response(TimelineSerializer(qs, many=True).data)

    def post(self, request, pk):
        study = _owned_study(request, pk)
        ensure_principal_timeline(study)
        serializer = TimelineWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        timeline = Timeline.objects.create(
            study=study,
            name=serializer.validated_data["name"],
            description=serializer.validated_data.get("description", ""),
            classification=serializer.validated_data["classification"],
            retrospective_year=serializer.validated_data["retrospective_year"],
            status=Timeline.Status.ACTIVE,
            is_default=False,
        )
        return Response(
            TimelineSerializer(timeline).data,
            status=status.HTTP_201_CREATED,
        )


class TimelineDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, timeline_id):
        timeline = _owned_timeline(request, pk, timeline_id)
        return Response(TimelineSerializer(timeline).data)

    def patch(self, request, pk, timeline_id):
        timeline = _owned_timeline(request, pk, timeline_id)
        serializer = TimelineWriteSerializer(data=request.data, partial=True)
        # Allow partial: rebuild with existing defaults
        data = {
            "name": request.data.get("name", timeline.name),
            "description": request.data.get(
                "description",
                timeline.description,
            ),
            "classification": request.data.get(
                "classification",
                timeline.classification,
            ),
            "retrospective_year": request.data.get(
                "retrospective_year",
                timeline.retrospective_year,
            ),
        }
        serializer = TimelineWriteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        for field, value in serializer.validated_data.items():
            setattr(timeline, field, value)
        timeline.save()
        return Response(TimelineSerializer(timeline).data)

    def delete(self, request, pk, timeline_id):
        timeline = _owned_timeline(request, pk, timeline_id)
        try:
            delete_timeline_hard(timeline)
        except ValueError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(status=status.HTTP_204_NO_CONTENT)


class TimelineArchiveView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, timeline_id):
        timeline = _owned_timeline(request, pk, timeline_id)
        timeline.archive()
        return Response(TimelineSerializer(timeline).data)


class TimelineRestoreView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, timeline_id):
        timeline = _owned_timeline(request, pk, timeline_id)
        timeline.restore()
        return Response(TimelineSerializer(timeline).data)


class TimelineRecallListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, timeline_id):
        timeline = _owned_timeline(request, pk, timeline_id)
        recalls = recalls_for_timeline(timeline).prefetch_related(
            "moments",
            "collapses__members",
        )
        return Response(RecallSerializer(recalls, many=True).data)

    def post(self, request, pk, timeline_id):
        timeline = _owned_timeline(request, pk, timeline_id)
        if timeline.status == Timeline.Status.ARCHIVED:
            return Response(
                {"detail": "No se pueden crear recuerdos en una línea archivada."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = RecallWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        sort_key = compute_temporal_sort_key(
            data["temporal_year"],
            data.get("temporal_month"),
            data.get("temporal_day"),
        )
        recall = Recall.objects.create(
            study=timeline.study,
            home_timeline=timeline,
            title=data["title"],
            location=data.get("location", ""),
            description_markdown=data["description_markdown"],
            classification=data["classification"],
            temporal_year=data["temporal_year"],
            temporal_month=data.get("temporal_month"),
            temporal_day=data.get("temporal_day"),
            sort_key=sort_key,
        )
        return Response(
            RecallSerializer(recall).data,
            status=status.HTTP_201_CREATED,
        )


class RecallDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, recall_id):
        recall = _owned_recall(request, pk, recall_id)
        return Response(RecallSerializer(recall).data)

    def patch(self, request, pk, recall_id):
        recall = _owned_recall(request, pk, recall_id)
        data = {
            "title": request.data.get("title", recall.title),
            "location": request.data.get("location", recall.location),
            "description_markdown": request.data.get(
                "description_markdown",
                recall.description_markdown,
            ),
            "classification": request.data.get(
                "classification",
                recall.classification,
            ),
            "temporal_year": request.data.get(
                "temporal_year",
                recall.temporal_year,
            ),
            "temporal_month": request.data.get(
                "temporal_month",
                recall.temporal_month,
            ),
            "temporal_day": request.data.get(
                "temporal_day",
                recall.temporal_day,
            ),
        }
        serializer = RecallWriteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        validated = serializer.validated_data
        for field, value in validated.items():
            setattr(recall, field, value)
        recall.recompute_sort_key()
        recall.save()
        return Response(RecallSerializer(recall).data)

    def delete(self, request, pk, recall_id):
        recall = _owned_recall(request, pk, recall_id)
        recall.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RecallMomentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk, recall_id):
        recall = _owned_recall(request, pk, recall_id)
        return Response(MomentSerializer(recall.moments.all(), many=True).data)

    def post(self, request, pk, recall_id):
        recall = _owned_recall(request, pk, recall_id)
        serializer = MomentWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        moment = Moment.objects.create(recall=recall, **serializer.validated_data)
        return Response(
            MomentSerializer(moment).data,
            status=status.HTTP_201_CREATED,
        )


class MomentDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk, recall_id, moment_id):
        recall = _owned_recall(request, pk, recall_id)
        moment = get_object_or_404(Moment, pk=moment_id, recall=recall)
        data = {
            "title": request.data.get("title", moment.title),
            "content_markdown": request.data.get(
                "content_markdown",
                moment.content_markdown,
            ),
            "type": request.data.get("type", moment.type),
            "reference": request.data.get("reference", moment.reference),
        }
        serializer = MomentWriteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        for field, value in serializer.validated_data.items():
            setattr(moment, field, value)
        moment.save()
        return Response(MomentSerializer(moment).data)

    def delete(self, request, pk, recall_id, moment_id):
        recall = _owned_recall(request, pk, recall_id)
        moment = get_object_or_404(Moment, pk=moment_id, recall=recall)
        moment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RecallCollapseCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, recall_id):
        recall = _owned_recall(request, pk, recall_id)
        serializer = CollapseWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            create_collapse(recall, serializer.validated_data["timeline_ids"])
        except ValueError as exc:
            return Response(
                {"detail": str(exc)},
                status=status.HTTP_400_BAD_REQUEST,
            )
        recall.refresh_from_db()
        return Response(
            RecallSerializer(recall).data,
            status=status.HTTP_201_CREATED,
        )

