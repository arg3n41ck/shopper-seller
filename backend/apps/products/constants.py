from django.db import models
from django.utils.translation import gettext_lazy as _


class GenderChoice(models.TextChoices):
    MALE = "MALE", _("Male")
    FEMALE = "FEMALE", _("Female")
    UNISEX = "UNISEX", _("Unisex")


class ProductStatusChoice(models.TextChoices):
    DRAFT = "DRAFT", _("Draft")
    ACTIVE = "ACTIVE", _("Active")
    INACTIVE = "INACTIVE", _("Inactive")
    ARCHIVE = "ARCHIVE", _("Archive")
