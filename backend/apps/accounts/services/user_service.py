from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.tokens import default_token_generator

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
            token, uid = self._generate_uid_token(user=user)
            reset_url = f"https://{settings.DOMAIN}/user/reset-password/?uid={uid}&token={token}"
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
            token, uid = self._generate_uid_token(user)
            print(token, uid)
            reset_url = f"https://{settings.DOMAIN}/user/reset-password/?uid={uid}&amp;token={token}"
            self.sms_service.send_sms(phone_numbers=[user.phone_number], text=reset_url)
        except self.user_model.DoesNotExist:
            pass

    def set_new_password(self, user: User, new_password: str):
        user.set_password(new_password)
        user.save(update_fields=["password"])

    def _generate_uid_token(self, user):
        token = default_token_generator.make_token(user=user)
        uid = encode_uid(user.pk)
        return token, uid

    def change_email_request(self, user: User, email: str) -> None:
        user.new_email_request = email
        user.save()
        token, uid = self._generate_uid_token(user)
        change_url = f"https://{settings.DOMAIN}/user/change-email-confirm/?uid={uid}&token={token}"
        self.email_service.send_email(
            subject=_("Reset email confirmation"),
            message=change_url,
            recipient_list=[email],
        )

    def change_phone_number_request(self, user: User, phone_number: str) -> None:
        user.new_phone_request = phone_number
        user.save()
        token, uid = self._generate_uid_token(user)
        change_url = f"https://{settings.DOMAIN}/user/change-phone-number-confirm/?uid={uid}&token={token}"
        self.sms_service.send_sms(
            phone_numbers=[phone_number],
            text=change_url,
        )

    def reset_email(self, user: User) -> None:
        user.email = user.new_email_request
        user.save(update_fields=["email"])

    def reset_phone_number(self, user: User) -> None:
        user.phone_number = user.new_phone_request
        user.save(update_fields=["phone_number"])
