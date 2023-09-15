import phonenumbers

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework import serializers

from djoser import serializers as djoser_serializers
from phonenumber_field.serializerfields import PhoneNumberField

from apps.accounts.constants import ErrorMessage
from apps.accounts.utils import decode_uid
from apps.customers.serializers import CustomerCreateSerializer
from apps.shops.serializers import ShopCreateSerializer


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'phone_number',
            'type',
        )


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)
    re_password = serializers.CharField(required=True)

    default_error_messages = {
        "password_mismatch": ErrorMessage.PASSWORD_MISMATCH
    }

    def validate(self, attrs):
        if attrs["password"] == attrs["re_password"]:
            return attrs
        else:
            self.fail("password_mismatch")


class UserBaseCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    re_password = serializers.CharField(required=True, write_only=True)

    default_error_messages = {
        'email_or_phone_number': ErrorMessage.EMAIL_OR_PHONE_NUMBER,
        'password_mismatch': ErrorMessage.PASSWORD_MISMATCH
    }

    class Meta:
        model = User
        fields = (
            'email',
            'phone_number',
            'type',
            'password',
            're_password',
        )

    def validate(self, attrs):
        email = attrs.get('email')
        phone_number = attrs.get('phone_number')

        if not email and not phone_number:
            self.fail('email_or_phone_number')

        password = attrs.get('password')
        re_password = attrs.get('re_password')

        if password != re_password:
            self.fail('password_mismatch')

        return attrs


class UserCustomerCreateSerializer(UserBaseCreateSerializer):
    customer = CustomerCreateSerializer(required=True)

    class Meta(UserBaseCreateSerializer.Meta):
        fields = UserBaseCreateSerializer.Meta.fields + (
            'customer',
        )


class UserSellerCreateSerializer(UserBaseCreateSerializer):
    shop = ShopCreateSerializer(required=True)

    class Meta(UserBaseCreateSerializer.Meta):
        fields = UserBaseCreateSerializer.Meta.fields + (
            "shop",
        )


class UidTokenSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()

    default_error_messages = {
        "invalid_token": ErrorMessage.INVALID_TOKEN_ERROR,
        "invalid_uid": ErrorMessage.INVALID_UID_ERROR,
    }

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        # uid validation have to be here, because validate_<field_name>
        # doesn't work with modelserializer
        try:
            uid = decode_uid(self.initial_data.get("uid", ""))
            self.user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            key_error = "invalid_uid"
            raise serializers.ValidationError(
                {"uid": [self.error_messages[key_error]]}, code=key_error
            )

        token_generator = PasswordResetTokenGenerator()

        if is_token_valid := token_generator.check_token(
            self.user, self.initial_data.get("token", "")
        ):
            return validated_data

        key_error = "invalid_token"
        raise serializers.ValidationError(
            {"token": [self.error_messages[key_error]]}, code=key_error
        )


class ActivationSerializer(UidTokenSerializer):
    default_error_messages = {
        "stale_token": ErrorMessage.STALE_TOKEN_ERROR,
    }

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not self.user.is_active:
            return attrs
        raise self.fail("stale_token")


class ResetPasswordSendMessageSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)

    default_error_messages = {
        'email_not_found': ErrorMessage.EMAIL_NOT_FOUND,
        'phone_number_not_found': ErrorMessage.PHONE_NUMBER_NOT_FOUND,
        'invalid_phone_number_format': ErrorMessage.INVALID_PHONE_NUMBER_FORMAT,
        'invalid_phone_number': ErrorMessage.INVALID_PHONE_NUMBER,
    }

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        username = validated_data.get('username')

        if '@' in username:
            if not User.objects.filter(email=username).exists():
                self.fail('email_not_found')
        else:
            try:
                parsed_phone_number = phonenumbers.parse(username)

                if not phonenumbers.is_valid_number(parsed_phone_number):
                    self.fail('invalid_phone_number')

                formatted_phone_number = phonenumbers.format_number(parsed_phone_number,
                                                                    phonenumbers.PhoneNumberFormat.E164)

                if not User.objects.filter(phone_number=formatted_phone_number).exists():
                    self.fail('phone_number_not_found')

                attrs['username'] = formatted_phone_number

            except phonenumbers.phonenumberutil.NumberParseException:
                self.fail('invalid_phone_number_format')

        return attrs


class ResetPasswordConfirmSerializer(UidTokenSerializer, PasswordSerializer):
    pass


class CurrentPasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(style={"input_type": "password"})

    default_error_messages = {
        "invalid_password": ErrorMessage.INVALID_PASSWORD_ERROR
    }

    def validate_current_password(self, value):
        if is_password_valid := self.context["request"].user.check_password(value):
            return value
        else:
            self.fail("invalid_password")


class SetPasswordSerializer(PasswordSerializer, CurrentPasswordSerializer):
    pass


class ResetUsernameSendMessageSerializer(serializers.Serializer):
    pass


class ResetEmailConfirmSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)

    default_error_messages = {
        "email_exists": ErrorMessage.EMAIL_EXISTS,
    }

    def validate(self, attrs):
        if User.objects.filter(email=attrs["email"]).exists():
            self.fail("email_exists")
        return attrs


class ResetPhoneNumberConfirmSerializer(serializers.Serializer):
    phone_number = PhoneNumberField(required=True)

    default_error_messages = {
        "phone_number_exists": ErrorMessage.PHONE_NUMBER_EXISTS
    }

    def validate(self, attrs):
        if User.objects.filter(phone_number=attrs["phone_number"]).exists():
            self.fail("phone_number_exists")
        return attrs
