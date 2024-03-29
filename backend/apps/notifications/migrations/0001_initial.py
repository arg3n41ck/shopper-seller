# Generated by Django 4.2.1 on 2023-10-06 07:38

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='NotificationSMSPro',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('text', models.CharField(max_length=800, verbose_name='Text')),
                ('phone_numbers', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=255), size=None, verbose_name='Phone numbers')),
                ('response', models.JSONField(blank=True, null=True, verbose_name='Response')),
            ],
            options={
                'verbose_name': 'Sms pro notification',
                'verbose_name_plural': 'Sms pro notifications',
            },
        ),
    ]
