from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.translation import gettext_lazy as _

from apps.accounts.models import User
from apps.customers.constants import CustomerPreferenceChoice
from shared.abstract_models import TimeStampedBaseModel


class Customer(TimeStampedBaseModel):
    user = models.OneToOneField(
        User,
        verbose_name=_("User"),
        on_delete=models.CASCADE,
        related_name="customer",
    )
    date_of_birth = models.DateField(
        verbose_name=_("Date of birth"),
        blank=True,
        null=True,
    )
    preferences = ArrayField(
        models.CharField(
            max_length=255,
            choices=CustomerPreferenceChoice.choices,
        ),
        verbose_name=_("Preferences")
    )

    class Meta:
        verbose_name = _("Customer")
        verbose_name_plural = _("Customers")

    def __str__(self):
        return self.user.email
