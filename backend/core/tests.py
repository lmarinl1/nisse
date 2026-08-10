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
        body = response.json()
        self.assertEqual(body["username"], "lonely")
        self.assertIn("first_name", body)
        self.assertIn("email", body)
        self.assertIn("role_title", body)
        self.assertIn("country_code", body)
        self.assertIn("phone", body)

    def test_patch_profile_me_updates_own_fields(self):
        self._auth(self.token)
        response = self.client.patch(
            "/api/profile/me/",
            {
                "first_name": "Miguel",
                "last_name": "García López",
                "role_title": "Diseñador de Futuros",
                "country_code": "+57",
                "phone": "3001234567",
                "email": "miguel@example.com",
                "username": "miguel",
                "id": str(self.other.profile.pk),
                "user_id": str(self.other.pk),
            },
            format="json",
        )
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["first_name"], "Miguel")
        self.assertEqual(body["last_name"], "García López")
        self.assertEqual(body["role_title"], "Diseñador de Futuros")
        self.assertEqual(body["country_code"], "+57")
        self.assertEqual(body["phone"], "3001234567")
        self.assertEqual(body["email"], "miguel@example.com")
        self.assertEqual(body["username"], "miguel")
        self.assertEqual(body["display_name"], "Miguel")

        self.user.refresh_from_db()
        self.other.refresh_from_db()
        self.assertEqual(self.user.username, "miguel")
        self.assertEqual(self.user.email, "miguel@example.com")
        self.assertEqual(self.other.username, "other")
        self.assertNotEqual(self.other.email, "miguel@example.com")

        own = Profile.objects.get(user=self.user)
        foreign = Profile.objects.get(user=self.other)
        self.assertEqual(own.first_name, "Miguel")
        self.assertEqual(foreign.first_name, "")

    def test_patch_profile_me_rejects_invalid_payload(self):
        self._auth(self.token)
        response = self.client.patch(
            "/api/profile/me/",
            {
                "first_name": "",
                "last_name": "García",
                "role_title": "Diseñador de Futuros",
                "country_code": "57",
                "phone": "12",
                "email": "not-an-email",
                "username": "designer",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        errors = response.json()
        self.assertIn("first_name", errors)
        self.assertIn("country_code", errors)
        self.assertIn("phone", errors)
        self.assertIn("email", errors)

    def test_patch_profile_me_rejects_duplicate_username(self):
        self._auth(self.token)
        response = self.client.patch(
            "/api/profile/me/",
            {
                "first_name": "Ana",
                "last_name": "Pérez",
                "role_title": "Diseñadora de Futuros",
                "country_code": "+52",
                "phone": "5512345678",
                "email": "ana@example.com",
                "username": "other",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("username", response.json())

    def test_logout_then_profile_returns_401(self):
        self._auth(self.token)
        logout = self.client.post("/api/auth/logout/")
        self.assertEqual(logout.status_code, 204)
        response = self.client.get("/api/profile/me/")
        self.assertEqual(response.status_code, 401)

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


class TimelineApiTests(APITestCase):
    def setUp(self):
        self.password = "research-lab-pass-1"
        self.user = User.objects.create_user(
            username="tl-owner",
            password=self.password,
        )
        ensure_profile(self.user)
        self.token = Token.objects.create(user=self.user)
        self.other = User.objects.create_user(
            username="tl-other",
            password=self.password,
        )
        ensure_profile(self.other)
        self.other_token = Token.objects.create(user=self.other)

    def _auth(self, token: Token):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")

    def test_create_study_materializes_principal_timeline(self):
        self._auth(self.token)
        create = self.client.post(
            "/api/studies/",
            {"name": "Interacción Humanos-Agentes"},
            format="json",
        )
        self.assertEqual(create.status_code, 201)
        study_id = create.json()["id"]
        listing = self.client.get(f"/api/studies/{study_id}/timelines/")
        self.assertEqual(listing.status_code, 200)
        body = listing.json()
        self.assertEqual(len(body), 1)
        self.assertTrue(body[0]["is_default"])
        self.assertEqual(body[0]["name"], "Interacción Humanos-Agentes")
        self.assertEqual(body[0]["status"], "active")

    def test_foreign_timelines_denied(self):
        self._auth(self.other_token)
        create = self.client.post(
            "/api/studies/",
            {"name": "Ajeno"},
            format="json",
        )
        study_id = create.json()["id"]
        self._auth(self.token)
        response = self.client.get(f"/api/studies/{study_id}/timelines/")
        self.assertEqual(response.status_code, 404)

    def test_archive_restore_and_hard_delete_guards(self):
        self._auth(self.token)
        study_id = self.client.post(
            "/api/studies/",
            {"name": "Caso"},
            format="json",
        ).json()["id"]
        created = self.client.post(
            f"/api/studies/{study_id}/timelines/",
            {
                "name": "Extra",
                "classification": "fictional",
                "retrospective_year": 2030,
            },
            format="json",
        )
        self.assertEqual(created.status_code, 201)
        timeline_id = created.json()["id"]
        principal_id = self.client.get(
            f"/api/studies/{study_id}/timelines/",
        ).json()[0]["id"]

        # Active cannot hard delete
        bad = self.client.delete(
            f"/api/studies/{study_id}/timelines/{timeline_id}/",
        )
        self.assertEqual(bad.status_code, 400)

        archive = self.client.post(
            f"/api/studies/{study_id}/timelines/{timeline_id}/archive/",
        )
        self.assertEqual(archive.status_code, 200)
        self.assertEqual(archive.json()["status"], "archived")

        restore = self.client.post(
            f"/api/studies/{study_id}/timelines/{timeline_id}/restore/",
        )
        self.assertEqual(restore.status_code, 200)
        self.assertEqual(restore.json()["status"], "active")

        self.client.post(
            f"/api/studies/{study_id}/timelines/{timeline_id}/archive/",
        )
        deleted = self.client.delete(
            f"/api/studies/{study_id}/timelines/{timeline_id}/",
        )
        self.assertEqual(deleted.status_code, 204)

        # Principal never hard-deletes
        self.client.post(
            f"/api/studies/{study_id}/timelines/{principal_id}/archive/",
        )
        principal_delete = self.client.delete(
            f"/api/studies/{study_id}/timelines/{principal_id}/",
        )
        self.assertEqual(principal_delete.status_code, 400)

    def test_bce_ordering_and_collapse_shared_identity(self):
        self._auth(self.token)
        study_id = self.client.post(
            "/api/studies/",
            {"name": "Temporal"},
            format="json",
        ).json()["id"]
        timelines = self.client.get(f"/api/studies/{study_id}/timelines/").json()
        a_id = timelines[0]["id"]
        b = self.client.post(
            f"/api/studies/{study_id}/timelines/",
            {
                "name": "Línea B",
                "classification": "real",
                "retrospective_year": -500,
            },
            format="json",
        ).json()
        b_id = b["id"]

        for year, title in [(-500, "500 a.C."), (-44, "44 a.C."), (1492, "1492")]:
            resp = self.client.post(
                f"/api/studies/{study_id}/timelines/{a_id}/recalls/",
                {
                    "title": title,
                    "description_markdown": f"Evento {title}",
                    "classification": "verified",
                    "temporal_year": year,
                },
                format="json",
            )
            self.assertEqual(resp.status_code, 201)

        ordered = self.client.get(
            f"/api/studies/{study_id}/timelines/{a_id}/recalls/",
        ).json()
        self.assertEqual(
            [r["title"] for r in ordered],
            ["500 a.C.", "44 a.C.", "1492"],
        )

        recall_id = ordered[0]["id"]
        collapse = self.client.post(
            f"/api/studies/{study_id}/recalls/{recall_id}/collapses/",
            {"timeline_ids": [a_id, b_id]},
            format="json",
        )
        self.assertEqual(collapse.status_code, 201)
        self.assertTrue(collapse.json()["is_collapse"])
        self.assertEqual(set(collapse.json()["timeline_ids"]), {a_id, b_id})

        on_b = self.client.get(
            f"/api/studies/{study_id}/timelines/{b_id}/recalls/",
        ).json()
        self.assertEqual(len(on_b), 1)
        self.assertEqual(on_b[0]["id"], recall_id)

        # Archived timeline rejects new recalls
        self.client.post(
            f"/api/studies/{study_id}/timelines/{b_id}/archive/",
        )
        blocked = self.client.post(
            f"/api/studies/{study_id}/timelines/{b_id}/recalls/",
            {
                "title": "No",
                "description_markdown": "x",
                "classification": "fiction",
                "temporal_year": 2100,
            },
            format="json",
        )
        self.assertEqual(blocked.status_code, 400)
