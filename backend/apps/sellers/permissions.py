from rest_framework import permissions

from apps.accounts.constants import UserTypeChoice


class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
            and request.user.type == UserTypeChoice.SELLER
        )
