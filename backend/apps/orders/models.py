from django.db import models
from django.utils.translation import gettext_lazy as _

from phonenumber_field.modelfields import PhoneNumberField

from shared.abstract_models import TimeStampedBaseModel
from apps.products.models import ProductVariant
from apps.customers.models import Customer
from apps.orders.constants import PaymentTypeChoice
from apps.products.validators import validate_size


class Cart(models.Model):
    customer = models.OneToOneField(
        Customer,
        on_delete=models.CASCADE,
        related_name="cart",
        verbose_name=_("Customer")
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
        related_name="pre_orders",
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
    product_variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="orders",
        verbose_name=_("Product variant"),
    )
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="items",
        verbose_name=_("Order"),
    )
    size = models.JSONField(
        validators=[validate_size],
        verbose_name=_("Size variant"),
    )
    quantity = models.PositiveIntegerField(
        verbose_name=_("Quantity"),
    )

    class Meta:
        verbose_name = _("Order item")
        verbose_name_plural = _("Order items")
