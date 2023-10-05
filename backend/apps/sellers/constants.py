from django.db import models
from django.utils.translation import gettext_lazy as _


class ShopStatusChoice(models.TextChoices):
    MODERATION = "MODERATION", _("Moderation")
    ACTIVE = "ACTIVE", _("Active")


class SellerErrorMessage:
    KEY_NOT_VALID = _("Key is not valid")
    USER_TYPE = _("User with type Customer can not create shop")
