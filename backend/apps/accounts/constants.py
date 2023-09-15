from django.db import models
from django.utils.translation import gettext_lazy as _


class UserTypeChoice(models.TextChoices):
    SELLER = 'SELLER', _('Seller')
    CUSTOMER = 'CUSTOMER', _('Customer')


class ErrorMessage:
    EMAIL_OR_PHONE_NUMBER = _("You must provide either phone number or email.")
    EMAIL_NOT_FOUND = _("User with given email does not exist.")
    EMAIL_EXISTS = _("User with given email exists.")
    PHONE_NUMBER_NOT_FOUND = _('User with given phone number does not exist.')
    PHONE_NUMBER_EXISTS = _('User with given phone number exists.')
    INVALID_PHONE_NUMBER_FORMAT = _('Invalid phone number format.')
    INVALID_PHONE_NUMBER = _('Invalid phone number.')
    STALE_TOKEN_ERROR = _("Token not valid")
    INVALID_TOKEN_ERROR = _("Invalid token for given user.")
    INVALID_UID_ERROR = _("Invalid user id or user doesn't exist.")
    PASSWORD_MISMATCH = _('The two password fields did not match.')
    INVALID_PASSWORD_ERROR = _("Invalid password.")

    INVALID_CREDENTIALS_ERROR = _("Unable to log in with provided credentials.")
    INACTIVE_ACCOUNT_ERROR = _("User account is disabled.")
    USERNAME_MISMATCH_ERROR = _("The two {0} fields didn't match.")
    CANNOT_CREATE_USER_ERROR = _("Unable to create account.")
