from django.db import transaction
from rest_framework import status
from rest_framework.response import Response


class CreateUserApiViewMixin:
    """
    Mixin for creating users with different roles.
    """
    service_class = None  # You should set this attribute in subclasses
    serializer_class = None  # You should set this attribute in subclasses

    @transaction.atomic()
    def perform_create(self, serializer):
        jwt_token = self.service_class.create_user(**serializer.validated_data)
        return jwt_token

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            jwt_token = self.perform_create(serializer)
            response_data = {
                "message": "Success message",
                "code": status.HTTP_201_CREATED,
                "data": serializer.data,
                "jwt_token": jwt_token,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
