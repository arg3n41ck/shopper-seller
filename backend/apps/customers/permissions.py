from rest_framework import permissions

from apps.accounts.constants import UserTypeChoice


class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
            and request.user.type == UserTypeChoice.CUSTOMER
        )

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
