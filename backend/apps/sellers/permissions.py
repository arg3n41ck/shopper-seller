from rest_framework import permissions

from apps.accounts.constants import UserTypeChoice


class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
            and request.user.type == UserTypeChoice.SELLER
        )

    # def has_object_permission(self, request, view, obj):
    #     if request.method in permissions.SAFE_METHODS:
    #         return True
    #     return obj.owner == request.user
