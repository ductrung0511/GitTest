# Generated by Django 5.0.1 on 2024-03-02 08:06

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("language", "0027_modelcourse_conclusion_modelcourse_result_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Contact",
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
                ("name", models.CharField(max_length=100)),
                ("message", models.CharField(max_length=200)),
                ("email", models.EmailField(max_length=100)),
                ("phone", models.CharField(max_length=14)),
                ("school", models.CharField(max_length=70)),
            ],
        ),
        migrations.DeleteModel(
            name="ContactRequest",
        ),
    ]
