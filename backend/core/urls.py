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
]
