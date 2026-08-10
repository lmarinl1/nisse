from django.db import migrations, models


def backfill_first_name_from_display_name(apps, schema_editor):
    Profile = apps.get_model("core", "Profile")
    for profile in Profile.objects.all():
        display = (profile.display_name or "").strip()
        first = (profile.first_name or "").strip()
        if display and not first:
            profile.first_name = display
            profile.save(update_fields=["first_name"])


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_backfill_principal_timelines"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="country_code",
            field=models.CharField(blank=True, default="", max_length=8),
        ),
        migrations.AddField(
            model_name="profile",
            name="first_name",
            field=models.CharField(blank=True, default="", max_length=100),
        ),
        migrations.AddField(
            model_name="profile",
            name="last_name",
            field=models.CharField(blank=True, default="", max_length=150),
        ),
        migrations.AddField(
            model_name="profile",
            name="phone",
            field=models.CharField(blank=True, default="", max_length=32),
        ),
        migrations.AddField(
            model_name="profile",
            name="role_title",
            field=models.CharField(blank=True, default="", max_length=150),
        ),
        migrations.AlterModelOptions(
            name="profile",
            options={"ordering": ["display_name", "first_name"]},
        ),
        migrations.RunPython(backfill_first_name_from_display_name, noop_reverse),
    ]
