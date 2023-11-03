from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.translation import gettext_lazy as _

from shared.abstract_models import TimeStampedBaseModel
from apps.notifications.constants import NotificationSMSProStatus


class NotificationSMSPro(TimeStampedBaseModel):
    text = models.CharField(
        max_length=800,
        verbose_name=_("Text"),
    )
    phone_numbers = ArrayField(
        models.CharField(
            max_length=255,
        ),
        verbose_name=_("Phone numbers")
    )
    status = models.CharField(
        max_length=255,
        default=NotificationSMSProStatus.PENDING,
        choices=NotificationSMSProStatus.choices,
        verbose_name=_("Status"),
    )

    class Meta:
        verbose_name = _("Sms pro notification")
        verbose_name_plural = _("Sms pro notifications")

    @property
    def format_created_at(self):
        return self.created_at.strftime("%Y%m%d%H%M%S")
