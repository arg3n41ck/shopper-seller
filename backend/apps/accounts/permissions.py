from rest_framework.permissions import BasePermission


class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_customer


class IsSeller(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_seller

    def has_object_permission(self, request, view, obj):
        pass
