from django.db import models
from django.utils.translation import gettext_lazy as _


class NotificationSMSProStatus(models.TextChoices):
    PENDING = "PENDING", _("Pending")
    RECEIVED = "RECEIVED", _("Received")
    ERROR = "ERROR", _("Error")
