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
