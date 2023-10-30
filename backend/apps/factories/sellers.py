import factory

from apps.sellers.models import SellerKey, Seller, Shop, ShopBranch
from apps.factories.users import UserSellerFactory


class SellerKeyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = SellerKey

    key = factory.Faker("word")
    is_active = True


class SellerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Seller

    user = factory.SubFactory(UserSellerFactory)
    key = factory.SubFactory(SellerKeyFactory)


class ShopFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Shop

    title = factory.Faker("word")
    seller = factory.SubFactory(SellerFactory)


class ShopBranchFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ShopBranch

    address = factory.Faker("sentence", nb_words=12)
    phone_number = factory.Faker("phone_number")
    shop = factory.SubFactory(ShopFactory)
