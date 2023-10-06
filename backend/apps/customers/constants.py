from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomerPreferenceChoice(models.TextChoices):
    MALE = "MALE", _("Male")
    FEMALE = "FEMALE", _("Female")
    BABY = "BABY", _("Baby")
