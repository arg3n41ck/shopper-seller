from django.db import transaction
from django.contrib.auth.tokens import default_token_generator
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
    ResetEmailConfirmSerializer,
    ResetPhoneNumberSerializer,
    ResetPhoneNumberConfirmSerializer,
)
from apps.accounts.services.user_service import UserService
from apps.accounts.constants import UserMessage
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


class UserCustomerCreateApiView(CreateUserApiViewMixin, generics.CreateAPIView):
    service_class = UserCustomerService()
    serializer_class = UserCustomerCreateSerializer
    permission_classes = [AllowAny]


class UserSellerCreateApiView(CreateUserApiViewMixin, generics.CreateAPIView):
    service_class = UserSellerService()
    serializer_class = UserSellerCreateSerializer
    permission_classes = [AllowAny]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    token_generator = default_token_generator
    service_class = UserService()
    
    def get_permissions(self):
        if self.action in ["reset_password_request_email", 
                           "reset_password_request_phone_number",
                           "reset_password_confirm"]:
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "reset_password_request_email":
            return ResetPasswordSendEmailSerializer
        elif self.action == "reset_password_request_phone_number":
            return ResetPasswordSendSMSSerializer
        elif self.action == "reset_password_confirm":
            return ResetPasswordConfirmSerializer
        elif self.action == "set_new_password":
            return SetNewPasswordSerializer
        elif self.action == "change_email_request":
            return ResetEmailSerializer
        elif self.action == "change_email_confirm":
            return ResetEmailConfirmSerializer
        elif self.action == "change_phone_number_request":
            return ResetPhoneNumberSerializer
        elif self.action == "change_phone_number_confirm":
            return ResetPhoneNumberConfirmSerializer
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
            "message": UserMessage.PASSWORD_RESET_EMAIL_SENT,
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
            "message": UserMessage.PASSWORD_RESET_SMS_SENT,
            "code": status.HTTP_202_ACCEPTED,
        }
        return Response(response_success, status=status.HTTP_202_ACCEPTED)

    @action(["post"], detail=False)
    def reset_password_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.set_new_password(
            user=serializer.user,
            new_password=serializer.validated_data["password"]
        )
        response_success = {
            "message": UserMessage.PASSWORD_CHANGED,
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
            "message": UserMessage.PASSWORD_CHANGED,
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def change_email_request(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.change_email_request(
            user=request.user,
            email=serializer.validated_data["email"],
        )
        response_success = {
            "message": UserMessage.CHANGE_EMAIL_SENT,
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def change_email_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_email(user=request.user)
        response_success = {
            "message": UserMessage.CHANGED_EMAIL,
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def change_phone_number_request(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.change_phone_number_request(
            user=request.user,
            phone_number=serializer.validated_data["phone_number"],
        )
        response_success = {
            "message": UserMessage.CHANGE_PHONE_NUMBER_SENT,
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def change_phone_number_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service_class.reset_phone_number(user=request.user)
        response_success = {
            "message": UserMessage.CHANGED_PHONE_NUMBER,
            "code": status.HTTP_204_NO_CONTENT,
        }
        return Response(response_success, status=status.HTTP_204_NO_CONTENT)
