import factory

from apps.sellers.models import Shop, Seller
from apps.accounts.factories import UserSellerFactory


class SellerFactory(factory.django.DjangoModelFactory):
    user = factory.SubFactory(UserSellerFactory)

    class Meta:
        model = Seller


class ShopFactory(factory.django.DjangoModelFactory):
    title = factory.Faker("word")
    seller = factory.SubFactory(SellerFactory)

    class Meta:
        model = Shop
