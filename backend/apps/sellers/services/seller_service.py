from apps.sellers.models import SellerKey, Seller, Shop, ShopBranch
from apps.accounts.services.user_service import UserService
from apps.accounts.services.jwt_service import JWTService
from apps.accounts.constants import UserTypeChoice


class UserSellerService:
    def __init__(self):
        self.seller_model = Seller
        self.seller_key_model = SellerKey
        self.shop_model = Shop
        self.user_service = UserService()
        self.jwt_service = JWTService()

    def create_user(self, email: str, phone_number: str, password: str, seller_data: dict, shop_data: dict) -> dict:
        user = self.user_service.create_user_by_email_and_phone(
            email=email,
            phone_number=phone_number,
            password=password,
            user_type=UserTypeChoice.SELLER,
        )

        key = self.seller_key_model.objects.get(key=seller_data.pop("key"))
        key.is_active = True
        key.save(update_fields=["is_active"])

        seller = self.seller_model.objects.create(user=user)
        seller.key = key
        seller.save()

        self.shop_model.objects.create(user=user, **shop_data)
        return self.jwt_service.create_user_token(user=user)
