from django.db import models
from django.utils.translation import gettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField

from shared.abstract_models import TimeStampedBaseModel
from apps.products.models import Product, ProductVariant
from apps.customers.models import Customer
from apps.orders.constants import PaymentTypeChoice


class Order(TimeStampedBaseModel):
    order_id = models.CharField(
        max_length=255,
        unique=True,
        verbose_name=_("Order ID"),
        blank=True,
        null=True,
    )
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="orders",
        verbose_name=_("Customer"),
        blank=True,
        null=True,
    )
    address = models.CharField(
        max_length=255,
        verbose_name=_("Address"),
    )
    city = models.CharField(
        max_length=255,
        verbose_name=_("City"),
    )
    region = models.CharField(
        max_length=255,
        verbose_name=_("Region"),
    )
    phone_number = PhoneNumberField(
        verbose_name=_("Phone number"),
    )
    payment_type = models.CharField(
        max_length=255,
        default=PaymentTypeChoice.CARD,
        choices=PaymentTypeChoice.choices,
        verbose_name=_("Payment type"),
    )

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")
        ordering = ("-created_at",)

    @property
    def total(self):
        return sum(item.total for item in self.items.all())


class OrderItem(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="orders",
        verbose_name=_("Product"),
    )
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="orders",
        verbose_name=_("Variant"),
        blank=True,
        null=True,
    )
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name=_("Order"),
    )
    price = models.DecimalField(
        verbose_name=_("Price"),
    )
    quantity = models.DecimalField(
        verbose_name=_("Quantity"),
    )

    class Meta:
        verbose_name = _("Order item")
        verbose_name_plural = _("Order items")

    @property
    def total(self):
        return self.price * self.quantity
