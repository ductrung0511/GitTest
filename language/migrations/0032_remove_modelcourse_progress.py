# Generated by Django 5.0.1 on 2024-03-06 07:35

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("language", "0031_exercise_bgcardurl"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="modelcourse",
            name="progress",
        ),
    ]
