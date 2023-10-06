from typing import Optional

from apps.accounts.models import User


class AuthenticationService:
    def authenticate_by_email(self, email: str, password: str) -> Optional[User]:
        return self._authenticate("email__iexact", email, password)

    def authenticate_by_phone_number(self, phone_number: str, password: str) -> Optional[User]:
        return self._authenticate("phone_number", phone_number, password)

    def _authenticate(self, lookup_field, value, password):
        try:
            user = User.objects.get(**{lookup_field: value})
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            pass
        return None
