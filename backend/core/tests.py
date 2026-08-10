from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Profile, Study, ensure_profile

User = get_user_model()


class HealthEndpointTests(APITestCase):
    def test_health_returns_ok_payload(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "status": "ok",
                "service": "nisse-backend",
                "api_version": "v1",
            },
        )


class IdentityAndStudyApiTests(APITestCase):
    def setUp(self):
        self.password = "research-lab-pass-1"
        self.user = User.objects.create_user(
            username="designer",
            password=self.password,
        )
        ensure_profile(self.user)
        self.token = Token.objects.create(user=self.user)
        self.other = User.objects.create_user(
            username="other",
            password=self.password,
        )
        ensure_profile(self.other)
        self.other_token = Token.objects.create(user=self.other)

    def _auth(self, token: Token):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")

    def test_unauthenticated_studies_return_401(self):
        response = self.client.get("/api/studies/")
        self.assertEqual(response.status_code, 401)

    def test_unauthenticated_profile_return_401(self):
        response = self.client.get("/api/profile/me/")
        self.assertEqual(response.status_code, 401)

    def test_profile_me_ensures_and_returns_profile(self):
        lonely = User.objects.create_user(username="lonely", password=self.password)
        token = Token.objects.create(user=lonely)
        self.assertFalse(Profile.objects.filter(user=lonely).exists())

        self._auth(token)
        response = self.client.get("/api/profile/me/")

        self.assertEqual(response.status_code, 200)
        self.assertTrue(Profile.objects.filter(user=lonely).exists())
        self.assertEqual(response.json()["username"], "lonely")

    def test_register_creates_user_profile_and_token(self):
        response = self.client.post(
            "/api/auth/register/",
            {"username": "novato", "password": self.password},
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        body = response.json()
        self.assertIn("token", body)
        self.assertTrue(User.objects.filter(username="novato").exists())
        user = User.objects.get(username="novato")
        self.assertTrue(Profile.objects.filter(user=user).exists())

    def test_create_and_retrieve_own_study(self):
        self._auth(self.token)
        create = self.client.post(
            "/api/studies/",
            {"name": "Futuros del agua", "description": "Exploración"},
            format="json",
        )
        self.assertEqual(create.status_code, 201)
        study_id = create.json()["id"]

        detail = self.client.get(f"/api/studies/{study_id}/")
        self.assertEqual(detail.status_code, 200)
        self.assertEqual(detail.json()["name"], "Futuros del agua")

    def test_cannot_access_foreign_study(self):
        study = Study.objects.create(owner=self.other, name="Ajeno")
        self._auth(self.token)
        response = self.client.get(f"/api/studies/{study.pk}/")
        self.assertEqual(response.status_code, 404)

    def test_list_excludes_archived(self):
        active = Study.objects.create(owner=self.user, name="Activo")
        archived = Study.objects.create(
            owner=self.user,
            name="Archivado",
            status=Study.Status.ARCHIVED,
        )
        self._auth(self.token)
        response = self.client.get("/api/studies/")
        self.assertEqual(response.status_code, 200)
        names = {item["name"] for item in response.json()}
        self.assertIn(active.name, names)
        self.assertNotIn(archived.name, names)

    def test_archive_hides_from_default_list(self):
        self._auth(self.token)
        create = self.client.post(
            "/api/studies/",
            {"name": "Para archivar"},
            format="json",
        )
        study_id = create.json()["id"]

        archive = self.client.post(f"/api/studies/{study_id}/archive/")
        self.assertEqual(archive.status_code, 200)
        self.assertEqual(archive.json()["status"], Study.Status.ARCHIVED)

        listing = self.client.get("/api/studies/")
        names = {item["name"] for item in listing.json()}
        self.assertNotIn("Para archivar", names)

    def test_hard_delete_not_supported(self):
        study = Study.objects.create(owner=self.user, name="Persistente")
        self._auth(self.token)
        response = self.client.delete(f"/api/studies/{study.pk}/")
        self.assertEqual(response.status_code, 405)
        self.assertTrue(Study.objects.filter(pk=study.pk).exists())


class CaseFrameworkApiTests(APITestCase):
    def setUp(self):
        self.password = "research-lab-pass-1"
        self.user = User.objects.create_user(
            username="cf-owner",
            password=self.password,
        )
        ensure_profile(self.user)
        self.token = Token.objects.create(user=self.user)
        self.other = User.objects.create_user(
            username="cf-other",
            password=self.password,
        )
        ensure_profile(self.other)
        self.other_token = Token.objects.create(user=self.other)
        self.study = Study.objects.create(owner=self.user, name="Marco propio")
        self.other_study = Study.objects.create(
            owner=self.other,
            name="Marco ajeno",
        )

    def _auth(self, token: Token):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")

    def test_get_creates_empty_framework_with_five_sections(self):
        self._auth(self.token)
        response = self.client.get(
            f"/api/studies/{self.study.pk}/case-framework/",
        )
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["study_id"], str(self.study.pk))
        self.assertEqual(len(body["sections"]), 5)
        types = [s["section_type"] for s in body["sections"]]
        self.assertEqual(
            types,
            [
                "conceptual-evolution",
                "theoretical-framework",
                "fundamental-concepts",
                "tensions",
                "consolidated-object",
            ],
        )
        for section in body["sections"]:
            self.assertEqual(section["status"], "not_started")
            self.assertFalse(section["reviewed"])

    def test_patch_section_and_status_derivation(self):
        self._auth(self.token)
        self.client.get(f"/api/studies/{self.study.pk}/case-framework/")
        patch = self.client.patch(
            f"/api/studies/{self.study.pk}/case-framework/sections/tensions/",
            {
                "fields": {
                    "main_tensions": "## Conflicto\n- A vs B",
                }
            },
            format="json",
        )
        self.assertEqual(patch.status_code, 200)
        self.assertEqual(patch.json()["status"], "in_progress")
        self.assertEqual(
            patch.json()["fields"]["main_tensions"],
            "## Conflicto\n- A vs B",
        )

        full = {
            "main_tensions": "a",
            "tension_origins": "b",
            "tension_productivity": "c",
            "unresolved_tensions": "d",
        }
        patch_full = self.client.patch(
            f"/api/studies/{self.study.pk}/case-framework/sections/tensions/",
            {"fields": full},
            format="json",
        )
        self.assertEqual(patch_full.status_code, 200)
        self.assertEqual(patch_full.json()["status"], "with_content")

        reviewed = self.client.patch(
            f"/api/studies/{self.study.pk}/case-framework/sections/tensions/",
            {"reviewed": True},
            format="json",
        )
        self.assertEqual(reviewed.status_code, 200)
        self.assertEqual(reviewed.json()["status"], "reviewed")

    def test_foreign_case_framework_denied(self):
        self._auth(self.token)
        response = self.client.get(
            f"/api/studies/{self.other_study.pk}/case-framework/",
        )
        self.assertEqual(response.status_code, 404)

    def test_isolation_between_studies(self):
        other_own = Study.objects.create(owner=self.user, name="Otro estudio")
        self._auth(self.token)
        self.client.patch(
            f"/api/studies/{self.study.pk}/case-framework/sections/"
            f"conceptual-evolution/",
            {"fields": {"initial_intuition": "Solo en estudio A"}},
            format="json",
        )
        other = self.client.get(
            f"/api/studies/{other_own.pk}/case-framework/",
        )
        self.assertEqual(other.status_code, 200)
        section = next(
            s
            for s in other.json()["sections"]
            if s["section_type"] == "conceptual-evolution"
        )
        self.assertEqual(section["fields"].get("initial_intuition", ""), "")
