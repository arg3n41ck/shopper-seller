from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils.translation import gettext_lazy as _

from apps.accounts.models import User
from apps.customers.constants import CustomerPreferenceChoice
from apps.products.models import ProductVariant
from apps.products.validators import validate_size
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


class Cart(models.Model):
    customer = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
        related_name="cart",
        verbose_name=_("Customer"),
    )

    class Meta:
        verbose_name = _("Cart")
        verbose_name_plural = _("Carts")

    @property
    def total(self):
        return sum(item.total for item in self.items.all())


class CartItem(TimeStampedBaseModel):
    cart = models.ForeignKey(
        Cart,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name=_("Cart"),
    )
    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="carts",
        verbose_name=_("Product variant"),
    )
    size = models.JSONField(
        validators=[validate_size],
        verbose_name=_("Size variant"),
    )
    quantity = models.PositiveIntegerField(
        default=1,
        verbose_name=_("Quantity"),
    )

    class Meta:
        verbose_name = _("Cart item")
        verbose_name_plural = _("Cart items")

    @property
    def total(self):
        return self.quantity * self.size["price"]
