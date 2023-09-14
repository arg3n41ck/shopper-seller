from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.translation import gettext_lazy as _

from apps.customers.constants import CustomerPreferenceChoice
from shared.abstract_models import TimeStampedBaseModel
from apps.products.models import Product, ProductVariant


User = get_user_model()


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


class CustomerCartItem(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="pre_orders",
        verbose_name=_("Product"),
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="pre_orders",
        verbose_name=_("Product"),
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="cart_items",
        verbose_name=_("Customer"),
    )
    quantity = models.PositiveIntegerField(
        default=1,
        verbose_name=_("Quantity"),
    )

    @property
    def total(self):
        return self.product.price * self.quantity
