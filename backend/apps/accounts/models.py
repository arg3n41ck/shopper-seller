from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField

from apps.accounts.constants import UserTypeChoice


class User(AbstractUser):
    username = models.CharField(
        max_length=255,
        unique=True,
        verbose_name=_("Username"),
        blank=True,
        null=True,
    )
    email = models.EmailField(
        max_length=255,
        unique=True,
        verbose_name=_("Email"),
        blank=True,
        null=True,
    )
    phone_number = PhoneNumberField(
        max_length=255,
        unique=True,
        verbose_name=_("Phone number"),
        blank=True,
        null=True,
    )
    type = models.CharField(
        max_length=255,
        choices=UserTypeChoice.choices,
        verbose_name=_("Type"),
    )
    new_email_request = models.EmailField(
        max_length=255,
        verbose_name=_("New email request"),
        blank=True,
        null=True,
    )
    new_phone_request = PhoneNumberField(
        max_length=255,
        verbose_name=_("New phone request"),
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
