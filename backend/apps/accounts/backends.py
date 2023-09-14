from django.contrib.auth import get_user_model

from apps.accounts.services import UserService


User = get_user_model()


class CustomAuthenticationBackend:
    def __init__(self):
        self.service = UserService()

    def authenticate(self, request, username=None, password=None):
        # Check if the username is in email format
        if '@' in username:
            return self.service.authenticate_by_email(username, password)
        else:
            return self.service.authenticate_by_phone_number(username, password)

    def get_user(self, pk: int):
        return User.objects.get(pk=pk)
