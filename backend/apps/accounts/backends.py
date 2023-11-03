from django.contrib.auth.backends import ModelBackend

from apps.accounts.services.auth_service import AuthenticationService


class CustomAuthenticationBackend(ModelBackend):
    def __init__(self):
        self.auth_service = AuthenticationService()

    def authenticate(self, request, username=None, password=None, **kwargs):
        if '@' in username:
            return self.auth_service.authenticate_by_email(username, password)
        else:
            return self.auth_service.authenticate_by_phone_number(username, password)
