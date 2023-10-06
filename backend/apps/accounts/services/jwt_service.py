from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from apps.accounts.models import User


class JWTService:
    def create_user_token(self, user: User) -> dict:
        return {
            "access": AccessToken.for_user(user),
            "refresh": RefreshToken.for_user(user)
        }
