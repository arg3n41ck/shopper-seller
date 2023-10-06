import phonenumbers

from typing import Optional

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.db import transaction
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.conf import settings

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from apps.accounts.constants import UserTypeChoice
from apps.accounts import utils
from apps.customers.services import CustomerService
from apps.shops.services import ShopService
from apps.orders.services import CartService


User = get_user_model()


class UserService:
    def __init__(self):
        self.model = User
        self.shop_service = ShopService()
        self.customer_service = CustomerService()
        self.cart_service = CartService()

    def authenticate_by_email(self, email: str, password: str) -> Optional[User]:
        email = self._normalize_email(email)
        user = self.model.objects.get(email=email)
        return user if user and user.check_password(password) else None

    def authenticate_by_phone_number(self, phone_number: str, password: str) -> Optional[User]:
        if phone_number_str := self._validate_and_format_phone_number(
            phone_number
        ):
            user = self.model.objects.get(phone_number=phone_number_str)
            if user and user.check_password(password):
                return user
        return None

    @transaction.atomic()
    def process_creation_customer(
            self, customer_data: dict, email: Optional[str] = None,
            phone_number: Optional[str] = None, password: Optional[str] = None
    ):
        if email:
            email_normalized = self._normalize_email(email)
            user = self.model(email=email_normalized, type=UserTypeChoice.CUSTOMER)
        else:
            phone_number_str = self._validate_and_format_phone_number(phone_number)
            user = self.model(phone_number=phone_number_str, type=UserTypeChoice.CUSTOMER)

        user.set_password(password)
        user.save()

        customer = self.customer_service.create_customer(user=user, customer_data=customer_data)
        self.cart_service.create_cart(customer=customer)
        return user

    @transaction.atomic()
    def process_create_seller(self, email: str, phone_number: str, password: str, shop_data: dict):
        # email = self._normalize_email(email)
        # phone_number_str = self._validate_and_format_phone_number(phone_number)
        user = self.model(email=email, phone_number=phone_number, type=UserTypeChoice.SELLER)
        user.set_password(password)
        user.save()

        self.shop_service.create_shop(user=user, shop_data=shop_data)

        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)
        return {"access": str(access_token), "refresh": str(refresh_token)}

    def process_reset_password(self, username: str) -> None:
        is_email = "@" in username

        if is_email:
            self._reset_password_by_email(email=username)
        else:
            self._reset_password_by_phone(phone_number=username)

    @staticmethod
    def set_new_password(user: User, new_password: str) -> None:
        user.set_password(new_password)
        user.save()

    def reset_username(self, username: str):
        is_email = "@" in username

        if is_email:
            pass
        else:
            pass

    @staticmethod
    def reset_email(user: User, email: str):
        user.email = email
        user.save(update_fields=["email"])

    @staticmethod
    def reset_phone_number(user: User, phone_number: str):
        user.phone_number = phone_number
        user.save(update_fields=["phone_number"])

    def _reset_password_by_email(self, email: str) -> None:
        user = self.model.objects.get(email=email)

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user=user)

        uid = utils.encode_uid(user.pk)
        reset_url = f"http://{settings.DOMAIN}/user/reset-password/{uid}/{token}"

        subject = 'Password Reset Request'
        message = render_to_string('reset_password.html', {
            'reset_url': reset_url,
        })
        send_mail(subject, message, settings.EMAIL_HOST_USER, [email])

    def _reset_password_by_phone(self, phone_number: str) -> None:
        pass

    @staticmethod
    def _validate_and_format_phone_number(phone_number: str) -> Optional[str]:
        try:
            parsed_phone_number = phonenumbers.parse(phone_number)
        except phonenumbers.phonenumberutil.NumberParseException:
            return None

        if phonenumbers.is_valid_number(parsed_phone_number):
            return phonenumbers.format_number(parsed_phone_number, phonenumbers.PhoneNumberFormat.E164)

        return None

    @staticmethod
    def _normalize_email(email: str) -> str:
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
