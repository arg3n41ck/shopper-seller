from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import serializers

from phonenumber_field.serializerfields import PhoneNumberField

from apps.accounts.models import User
from apps.accounts.constants import UserErrorMessage
from apps.accounts.utils import decode_uid
from apps.customers.serializers import CustomerCreateSerializer
from apps.sellers.serializers import ShopCreateSerializer, SellerKeySerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "phone_number",
            "type",
        )


class PasswordRetypeSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)
    re_password = serializers.CharField(required=True)

    default_error_messages = {
        "password_mismatch": UserErrorMessage.PASSWORD_MISMATCH
    }

    def validate(self, attrs):
        if attrs["password"] != attrs["re_password"]:
            self.fail("password_mismatch")
        return attrs


class UserBaseCreateSerializer(PasswordRetypeSerializer, serializers.ModelSerializer):
    default_error_messages = {
        "email_or_phone_number": UserErrorMessage.EMAIL_OR_PHONE_NUMBER,
    }

    class Meta:
        model = User
        fields = (
            "email",
            "phone_number",
            "password",
            "re_password",
        )

    def validate(self, attrs):
        email = attrs.get("email")
        phone_number = attrs.get("phone_number")

        if not email and not phone_number:
            self.fail("email_or_phone_number")
        return attrs


class UserCustomerCreateSerializer(UserBaseCreateSerializer):
    customer = CustomerCreateSerializer(required=True)

    class Meta(UserBaseCreateSerializer.Meta):
        fields = UserBaseCreateSerializer.Meta.fields + (
            "customer",
        )


class UserSellerCreateSerializer(UserBaseCreateSerializer):
    shop = ShopCreateSerializer(required=True)
    seller_key = SellerKeySerializer(required=True)

    class Meta(UserBaseCreateSerializer.Meta):
        fields = UserBaseCreateSerializer.Meta.fields + (
            "shop",
            "seller_key",
        )


class ResetPasswordSendEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    default_error_messages = {
        "email_not_found": UserErrorMessage.EMAIL_NOT_FOUND,
    }

    def validate(self, attrs):
        if not User.objects.get(email=attrs["email"]):
            self.fail("email_not_found")
        return attrs


class ResetPasswordSendSMSSerializer(serializers.Serializer):
    phone_number = PhoneNumberField(required=True)

    default_error_messages = {
        "phone_number_not_found": UserErrorMessage.PHONE_NUMBER_NOT_FOUND,
    }

    def validate(self, attrs):
        if not User.objects.get(phone_number=attrs["phone_number"]):
            self.fail("phone_number_not_found")
        return attrs


class UidTokenSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()

    default_error_messages = {
        "invalid_token": UserErrorMessage.INVALID_TOKEN_ERROR,
        "invalid_uid": UserErrorMessage.INVALID_UID_ERROR,
    }

    def validate_uid(self, value):
        try:
            uid = decode_uid(value)
            self.user = User.objects.get(pk=uid)
            return value
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            self.fail("invalid_uid")

    def validate_token(self, value):
        token_generator = PasswordResetTokenGenerator()

        if not token_generator.check_token(self.user, value):
            self.fail("invalid_token")

        return value


class ResetPasswordConfirmSerializer(UidTokenSerializer, PasswordRetypeSerializer):
    pass


class CurrentPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)

    default_error_messages = {
        "invalid_password": UserErrorMessage.INVALID_PASSWORD_ERROR
    }

    def validate_current_password(self, value):
        request = self.context["request"]
        if not request.user.check_password(value):
            self.fail("invalid_password")
        return value


class SetNewPasswordSerializer(PasswordRetypeSerializer, CurrentPasswordSerializer):
    pass


class ActivationSerializer(UidTokenSerializer):
    default_error_messages = {
        "stale_token": UserErrorMessage.STALE_TOKEN_ERROR,
    }

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not self.user.is_active:
            return attrs
        raise self.fail("stale_token")


class ResetPhoneNumberSerializer(CurrentPasswordSerializer):
    phone_number = PhoneNumberField(required=True)
    re_phone_number = PhoneNumberField(required=True)

    default_error_messages = {
        "phone_number_mismatch": UserErrorMessage.PHONE_NUMBER_MISMATCH,
        "phone_number_exists": UserErrorMessage.PHONE_NUMBER_EXISTS,
    }

    def validate(self, attrs):
        if attrs["phone_number"] != attrs["re_phone_number"]:
            self.fail("phone_number_mismatch")

        if User.objects.filter(phone_number=attrs["re_phone_number"]).exists():
            self.fail("phone_number_exists")
        return attrs


class ResetEmailSerializer(CurrentPasswordSerializer):
    email = serializers.CharField(required=True)
    re_email = serializers.CharField(required=True)

    default_error_messages = {
        "email_mismatch": UserErrorMessage.EMAIL_MISMATCH,
        "email_exists": UserErrorMessage.EMAIL_EXISTS,
    }

    def validate(self, attrs):
        if attrs["email"] != attrs["re_email"]:
            self.fail("email_mismatch")
        if User.objects.filter(email=attrs["email"]).exists():
            self.fail("email_exists")
        return attrs
