from rest_framework import permissions

from apps.accounts.constants import UserTypeChoice


class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        return True if request.user.type == UserTypeChoice.SELLER else False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
