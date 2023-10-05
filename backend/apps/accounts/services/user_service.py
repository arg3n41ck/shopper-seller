from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings
from django.utils.translation import gettext_lazy as _

from apps.accounts.models import User
from apps.accounts.constants import UserTypeChoice
from apps.accounts.utils import encode_uid
from apps.notifications.services.email_service import EmailService
from apps.notifications.services.sms_service import SMSProService


class UserService:
    def __init__(self):
        self.user_model = User
        self.email_service = EmailService()
        self.sms_service = SMSProService()

    def create_user_by_email_and_phone(self, email: str, phone_number: str,
                                       password: str, user_type: UserTypeChoice) -> User:
        user = self.user_model(email=email, phone_number=phone_number)
        user.type = user_type
        user.set_password(password)
        user.save()
        return user

    def create_user_by_email_or_phone(self, email: str, phone_number: str,
                                      password: str, user_type: UserTypeChoice) -> User:
        if email:
            user = self.user_model(email=email)
        else:
            user = self.user_model(phone_number=phone_number)
        user.type = user_type
        user.set_password(password)
        user.save()
        return user

    def reset_password_send_email(self, email: str) -> None:
        try:
            user = self.user_model.objects.get(email=email)
            reset_url = self._generate_reset_url(user=user)
            self.email_service.send_template_email(
                subject=_("Password reset confirmation"),
                template_name="reset_password.html",
                context={
                    "reset_url": reset_url,
                },
                recipient_list=[email]
            )
        except self.user_model.DoesNotExist:
            pass

    def reset_password_send_sms(self, phone_number: str) -> None:
        try:
            user = self.user_model.objects.get(phone_number=phone_number)
            reset_url = self._generate_reset_url(user=user)
            self.sms_service.send_sms(phone_numbers=[user.phone_number], text=reset_url)
        except self.user_model.DoesNotExist:
            pass

    def set_new_password(self, user: User, new_password: str):
        user.set_password(new_password)
        user.save(update_fields=["password"])

    def _generate_reset_url(self, user: User):
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user=user)

        uid = encode_uid(user.pk)
        reset_url = f"https://{settings.DOMAIN}/user/reset-password/{uid}/{token}"
        return reset_url

    def reset_email(self, user: User, email: str):
        user.email = email
        user.save(update_fields=["email"])

    def reset_phone_number(self, user: User, phone_number: str):
        user.phone_number = phone_number
        user.save()
