from datetime import date

from django.db import migrations


def backfill_principal_timelines(apps, schema_editor):
    Study = apps.get_model("core", "Study")
    Timeline = apps.get_model("core", "Timeline")
    year = date.today().year
    for study in Study.objects.all():
        if Timeline.objects.filter(study=study, is_default=True).exists():
            continue
        Timeline.objects.create(
            study=study,
            name=study.name,
            description="",
            classification="real",
            retrospective_year=year,
            status="active",
            is_default=True,
        )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_timelines"),
    ]

    operations = [
        migrations.RunPython(backfill_principal_timelines, noop_reverse),
    ]
