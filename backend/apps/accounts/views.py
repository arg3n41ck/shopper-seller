from django.db import transaction
from django.utils.translation import gettext_lazy as _
from rest_framework import viewsets, status, views, generics
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed

from apps.accounts.models import User
from apps.accounts.serializers import (
    UserSerializer,
    UserCustomerCreateSerializer,
    UserSellerCreateSerializer,
    ResetPasswordSendEmailSerializer,
    ResetPasswordSendSMSSerializer,
    ResetPasswordConfirmSerializer,
    SetNewPasswordSerializer,
    ResetEmailSerializer,
    ResetPhoneNumberSerializer,
)
from apps.accounts.services.user_service import UserService
from apps.customers.services.customer_services import UserCustomerService
from apps.sellers.services.seller_service import UserSellerService


# Need to do refactor and research
class TokenDestroyView(views.APIView):
    """Use this endpoint to logout user (remove user authentication token)."""

    permission_classes = IsAuthenticated

    def post(self, request):
        from apps.accounts import utils

        utils.logout_user(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserCustomerCreateApiView(generics.CreateAPIView):
    service_class = UserCustomerService()
    serializer_class = UserCustomerCreateSerializer
    permission_classes = [AllowAny]

    @transaction.atomic()
    def perform_create(self, serializer):
        jwt_token = self.service_class.create_user_customer(
            customer_data=serializer.validated_data["customer"],
            email=serializer.validated_data["email"],
            phone_number=serializer.validated_data["phone_number"],
            password=serializer.validated_data["password"],
        )
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


class UserSellerCreateApiView(generics.CreateAPIView):
    service_class = UserSellerService()
    serializer_class = UserSellerCreateSerializer
    permission_classes = [AllowAny]

    @transaction.atomic()
    def perform_create(self, serializer):
        jwt_token = self.service_class.create_user_seller(
            shop_data=serializer.validated_data["shop"],
            seller_key=serializer.validated_data["seller_key"],
            email=serializer.validated_data["email"],
            phone_number=serializer.validated_data["phone_number"],
            password=serializer.validated_data["password"],
        )
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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    service_class = UserService()

    def get_serializer_class(self):
        if self.action == "reset_password_request_email":
            return ResetPasswordSendEmailSerializer
        elif self.action == "reset_password_request_phone_number":
            return ResetPasswordSendSMSSerializer
        elif self.action == "reset_password_confirm":
            return ResetPasswordConfirmSerializer
        elif self.action == "set_new_password":
            return SetNewPasswordSerializer
        elif self.action == "reset_email_request":
            return ResetEmailSerializer
        elif self.action == "reset_phone_number_request":
            return ResetPhoneNumberSerializer
        return self.serializer_class

    def get_object(self):
        return self.request.user

    @action(["get", "put", "patch", "delete"], detail=False)
    def me(self, request, *args, **kwargs):
        if request.method == "GET":
            return self.retrieve(request, *args, **kwargs)
        elif request.method == "PUT":
            return self.update(request, *args, **kwargs)
        elif request.method == "PATCH":
            return self.partial_update(request, *args, **kwargs)
        elif request.method == "DELETE":
            return self.destroy(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST')

    @action(methods=["post"], detail=False)
    def reset_password_request_email(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_password_send_email(email=serializer.data["email"])
        response_success = {
            "message": _("Password reset email sent successfully"),
            "code": status.HTTP_202_ACCEPTED,
        }
        return Response(response_success, status=status.HTTP_202_ACCEPTED)

    @action(methods=["post"], detail=False)
    def reset_password_request_phone_number(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_password_send_sms(
            phone_number=serializer.validated_data["phone_number"],
        )
        response_success = {
            "message": _("Password reset sms sent successfully"),
            "code": status.HTTP_202_ACCEPTED,
        }
        return Response(response_success, status=status.HTTP_202_ACCEPTED)

    @action(["post"], detail=False)
    def reset_password_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.set_new_password(
            user=serializer.user,
            new_password=serializer.data["password"]
        )
        response_success = {
            "message": _("Password changed successfully"),
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def set_new_password(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.set_new_password(
            user=request.user,
            new_password=serializer.data["password"]
        )
        response_success = {
            "message": _("Password changed successfully"),
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_email_request(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_email(
            user=request.user,
            email=serializer.validated_data["email"],
        )
        response_success = {
            "message": _("Email changed successfully"),
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_email_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_email(
            user=request.user,
            email=serializer.validated_data["email"],
        )
        response_success = {
            "message": _("Email changed successfully"),
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_phone_request(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_phone_number(
            user=request.user,
            phone_number=serializer.validated_data["phone_number"],
        )
        response_success = {
            "message": _("Phone number changed successfully"),
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_phone_number_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_phone_number(
            user=request.user,
            phone_number=serializer.validated_data["phone_number"],
        )
        response_success = {
            "message": _("Email changed successfully"),
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)
