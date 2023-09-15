from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import FileExtensionValidator

from phonenumber_field.modelfields import PhoneNumberField

from apps.shops.constants import ShopStatusChoice
from shared.abstract_models import TimeStampedBaseModel


User = get_user_model()


class ShopKey(models.Model):
    key = models.CharField(
        max_length=10,
        unique=True,
        verbose_name=_("Key"),
    )
    is_active = models.BooleanField(
        default=False,
        verbose_name=_("Is active"),
    )

    class Meta:
        verbose_name = _("Shop key")
        verbose_name_plural = _("Shop keys")

    def __str__(self):
        return self.key


class Shop(TimeStampedBaseModel):
    slug = models.SlugField(
        max_length=255,
        unique=True,
        verbose_name=_("Slug"),
    )
    logo = models.FileField(
        upload_to="images/shops",
        validators=[
            FileExtensionValidator(
                allowed_extensions=["jpg", "jpeg", "png", "svg"],
                message=_("Only JPEG, PNG and SVG image files are allowed.")
            )
        ],
        verbose_name=_("Logo"),
        blank=True,
        null=True,
    )
    title = models.CharField(
        max_length=255,
        verbose_name=_("Title"),
    )
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="shop",
        verbose_name=_("Owner"),
    )
    status = models.CharField(
        max_length=255,
        choices=ShopStatusChoice.choices,
        default=ShopStatusChoice.MODERATION,
        verbose_name=_("Status"),
    )
    site_link = models.URLField(
        verbose_name=_("Site link"),
        blank=True,
        null=True,
    )
    instagram_link = models.URLField(
        verbose_name=_("Instagram link"),
        blank=True,
        null=True,
    )
    whats_app_link = models.URLField(
        verbose_name=_("Whats App link"),
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = _('Shop')
        verbose_name_plural = _('Shops')

    def __str__(self):
        return self.title


class BranchAddress(models.Model):
    address = models.CharField(
        max_length=255,
        verbose_name=_("Address"),
    )
    phone_number = PhoneNumberField(
        max_length=255,
        verbose_name=_("Phone number"),
    )
    shop = models.ForeignKey(
        Shop,
        on_delete=models.CASCADE,
        related_name="branches",
        verbose_name=_("Shop"),
    )

    class Meta:
        verbose_name = _("Branch address")
        verbose_name_plural = _("Branch addresses")

    def __str__(self):
        return self.address
