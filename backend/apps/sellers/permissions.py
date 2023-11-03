from rest_framework import permissions

from apps.accounts.constants import UserTypeChoice


class SellerPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user.is_authenticated
            and request.user.type == UserTypeChoice.SELLER
        )


class SellerObjectPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.seller == request.user.seller


class ShopObjectPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.shop == request.user.seller.shop
