# Generated by Django 5.0.1 on 2024-02-13 07:06

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("language", "0004_remove_question_testingjson_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Section",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("externalLink", models.TextField()),
                ("timeSpan", models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name="modelsession",
            name="afterClass",
            field=models.ManyToManyField(
                related_name="after_class_sessions", to="language.section"
            ),
        ),
        migrations.AddField(
            model_name="modelsession",
            name="beforeClass",
            field=models.ManyToManyField(
                related_name="before_class_sessions", to="language.section"
            ),
        ),
        migrations.AddField(
            model_name="modelsession",
            name="inClass",
            field=models.ManyToManyField(
                related_name="in_class_sessions", to="language.section"
            ),
        ),
    ]