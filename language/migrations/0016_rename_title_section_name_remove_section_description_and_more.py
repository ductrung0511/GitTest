# Generated by Django 5.0.1 on 2024-02-24 10:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("language", "0015_remove_modelsession_afterclass_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="section",
            old_name="title",
            new_name="name",
        ),
        migrations.RemoveField(
            model_name="section",
            name="description",
        ),
        migrations.RemoveField(
            model_name="section",
            name="questionsJSON",
        ),
        migrations.AddField(
            model_name="section",
            name="content",
            field=models.TextField(null=True),
        ),
    ]
