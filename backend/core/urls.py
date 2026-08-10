from django.urls import path

from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("auth/register/", views.RegisterView.as_view(), name="auth-register"),
    path("auth/login/", views.LoginView.as_view(), name="auth-login"),
    path("auth/logout/", views.LogoutView.as_view(), name="auth-logout"),
    path("profile/me/", views.ProfileMeView.as_view(), name="profile-me"),
    path("studies/", views.StudyListCreateView.as_view(), name="study-list-create"),
    path("studies/<str:pk>/", views.StudyDetailView.as_view(), name="study-detail"),
    path(
        "studies/<str:pk>/archive/",
        views.StudyArchiveView.as_view(),
        name="study-archive",
    ),
    path(
        "studies/<str:pk>/case-framework/",
        views.CaseFrameworkDetailView.as_view(),
        name="study-case-framework",
    ),
    path(
        "studies/<str:pk>/case-framework/sections/<str:section_type>/",
        views.CaseFrameworkSectionPatchView.as_view(),
        name="study-case-framework-section",
    ),
    path(
        "studies/<str:pk>/timelines/",
        views.TimelineListCreateView.as_view(),
        name="study-timeline-list",
    ),
    path(
        "studies/<str:pk>/timelines/<str:timeline_id>/",
        views.TimelineDetailView.as_view(),
        name="study-timeline-detail",
    ),
    path(
        "studies/<str:pk>/timelines/<str:timeline_id>/archive/",
        views.TimelineArchiveView.as_view(),
        name="study-timeline-archive",
    ),
    path(
        "studies/<str:pk>/timelines/<str:timeline_id>/restore/",
        views.TimelineRestoreView.as_view(),
        name="study-timeline-restore",
    ),
    path(
        "studies/<str:pk>/timelines/<str:timeline_id>/recalls/",
        views.TimelineRecallListCreateView.as_view(),
        name="study-timeline-recalls",
    ),
    path(
        "studies/<str:pk>/recalls/<str:recall_id>/",
        views.RecallDetailView.as_view(),
        name="study-recall-detail",
    ),
    path(
        "studies/<str:pk>/recalls/<str:recall_id>/moments/",
        views.RecallMomentListCreateView.as_view(),
        name="study-recall-moments",
    ),
    path(
        "studies/<str:pk>/recalls/<str:recall_id>/moments/<str:moment_id>/",
        views.MomentDetailView.as_view(),
        name="study-moment-detail",
    ),
    path(
        "studies/<str:pk>/recalls/<str:recall_id>/collapses/",
        views.RecallCollapseCreateView.as_view(),
        name="study-recall-collapses",
    ),
]
