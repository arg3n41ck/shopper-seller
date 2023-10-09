from django.db import transaction
from rest_framework import status, mixins
from rest_framework.response import Response

from apps.accounts.constants import UserMessage


class CreateUserApiViewMixin:
    """
    Mixin for creating users with different roles.
    """
    service_class = None  # You should set this attribute in subclasses
    serializer_class = None  # You should set this attribute in subclasses

    @transaction.atomic()
    def perform_create(self, serializer):
        return self.service_class.create_user(**serializer.validated_data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        jwt_token = self.perform_create(serializer)
        response_data = {
            "message": UserMessage.USER_CREATED,
            "code": status.HTTP_201_CREATED,
            "response": jwt_token,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
