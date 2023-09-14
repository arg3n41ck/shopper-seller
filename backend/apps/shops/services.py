from django.contrib.auth import get_user_model

from apps.shops.models import Shop, ShopKey


User = get_user_model()


class ShopService:
    def __init__(self):
        self.model = Shop
        self.key_model = ShopKey

    def create_shop(self, user: User, shop_data: dict) -> Shop:
        return self.model.objects.create(user=user, **shop_data)

    def shop_key_exists(self, key: str) -> bool:
        return self.key_model.objects.filter(key=key).exists()
