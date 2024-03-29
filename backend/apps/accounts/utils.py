import phonenumbers

from typing import Optional

from django.contrib.auth import login, logout, user_logged_in, user_logged_out
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from djoser.conf import settings


def encode_uid(pk):
    return force_str(urlsafe_base64_encode(force_bytes(pk)))


def decode_uid(pk):
    return force_str(urlsafe_base64_decode(pk))


def login_user(request, user):
    token, _ = settings.TOKEN_MODEL.objects.get_or_create(user=user)
    if settings.CREATE_SESSION_ON_LOGIN:
        login(request, user)
    user_logged_in.send(sender=user.__class__, request=request, user=user)
    return token


def logout_user(request):
    if settings.TOKEN_MODEL:
        settings.TOKEN_MODEL.objects.filter(user=request.user).delete()
        user_logged_out.send(
            sender=request.user.__class__, request=request, user=request.user
        )
    if settings.CREATE_SESSION_ON_LOGIN:
        logout(request)


def validate_and_format_phone_number(phone_number: str) -> Optional[str]:
    try:
        parsed_phone_number = phonenumbers.parse(phone_number)
    except phonenumbers.phonenumberutil.NumberParseException:
        return None

    if phonenumbers.is_valid_number(parsed_phone_number):
        return phonenumbers.format_number(parsed_phone_number, phonenumbers.PhoneNumberFormat.E164)

    return None


def normalize_email(email: str) -> str:
    """
    Normalize the email address by lowercasing the domain part of it.
    """
    email = email or ""
    try:
        email_name, domain_part = email.strip().rsplit("@", 1)
    except ValueError:
        pass
    else:
        email = f"{email_name}@{domain_part.lower()}"
    return email.lower()
