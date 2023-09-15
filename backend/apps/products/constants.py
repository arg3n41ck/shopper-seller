from django.db import models
from django.utils.translation import gettext_lazy as _


class GenderChoice(models.TextChoices):
    MALE = "MALE", _("Male")
    FEMALE = "FEMALE", _("Female")


class ProductStatusChoice(models.TextChoices):
    DRAFT = "DRAFT", _("Draft")
    ACTIVE = "ACTIVE", _("Active")
    ARCHIVE = "ARCHIVE", _("Archive")
