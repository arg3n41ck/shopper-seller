from django.contrib.auth import get_user_model
from rest_framework import viewsets, status, permissions, views
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import MethodNotAllowed

from djoser.views import UserViewSet as DjoserUserViewSer
from djoser import permissions as djoser_permissions

from apps.accounts.services import UserService
from apps.accounts.serializers import (
    UserSerializer,
    UserCustomerCreateSerializer,
    UserSellerCreateSerializer,
    ResetPasswordSendMessageSerializer,
    ResetPasswordConfirmSerializer,
    SetPasswordSerializer,
    ResetUsernameSendMessageSerializer,
    ResetEmailConfirmSerializer,
    ResetPhoneNumberConfirmSerializer,
)
from apps.accounts import utils


User = get_user_model()


class TokenDestroyView(views.APIView):
    """Use this endpoint to logout user (remove user authentication token)."""

    permission_classes = IsAuthenticated

    def post(self, request):
        utils.logout_user(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    service = UserService()

    def get_permissions(self):
        if self.action in ["create_customer", "create_seller"]:
            return AllowAny()
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "create_customer":
            return UserCustomerCreateSerializer
        elif self.action == "create_seller":
            return UserSellerCreateSerializer
        elif self.action == "reset_password":
            return ResetPasswordSendMessageSerializer
        elif self.action == "reset_password_confirm":
            return ResetPasswordConfirmSerializer
        elif self.action == "set_password":
            return SetPasswordSerializer
        elif self.action == "reset_username":
            return ResetUsernameSendMessageSerializer
        elif self.action == "reset_email_confirm":
            return ResetEmailConfirmSerializer
        elif self.action == "reset_phone_number_confirm":
            return ResetPhoneNumberConfirmSerializer
        return self.serializer_class

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed('POST')

    def get_instance(self):
        return self.request.user

    @action(['post'], detail=False)
    def create_customer(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.process_creation_customer(
            customer_data=serializer.validated_data['customer'],
            email=serializer.validated_data.get('email', None),
            phone_number=serializer.validated_data.get('phone_number', None),
            password=serializer.validated_data['password'],
        )
        return Response(status=status.HTTP_201_CREATED)

    @action(['post'], detail=False)
    def create_seller(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.create_seller(
            email=serializer.validated_data['email'],
            phone_number=serializer.validated_data['phone_number'],
            password=serializer.validated_data['password'],
            shop_data=serializer.validated_data['shop'],
        )
        return Response(status=status.HTTP_201_CREATED)

    @action(["get", "put", "patch", "delete"], detail=False)
    def me(self, request, *args, **kwargs):
        self.get_object = self.get_instance()

        if request.method == "GET":
            return self.retrieve(request, *args, **kwargs)
        elif request.method == "PUT":
            return self.update(request, *args, **kwargs)
        elif request.method == "PATCH":
            return self.partial_update(request, *args, **kwargs)
        elif request.method == "DELETE":
            return self.destroy(request, *args, **kwargs)

    @action(["post"], detail=False)
    def reset_password(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.process_reset_password(
            username=serializer.validated_data["username"],
        )
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_password_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.set_new_password(
            user=serializer.user,
            new_password=serializer.data["password"]
        )
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def set_password(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.set_new_password(
            user=request.user,
            new_password=serializer.data["password"]
        )
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_username(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.reset_username(
            username=serializer.validated_data["username"]
        )
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_email_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.reset_email(
            user=request.user,
            email=serializer.validated_data["email"],
        )
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def reset_phone_number_confirm(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.service.reset_phone_number(
            user=request.user,
            phone_number=serializer.validated_data["phone_number"],
        )
        return Response(status=status.HTTP_204_NO_CONTENT)
