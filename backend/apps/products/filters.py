import django_filters

from apps.products.models import Product


class SellerProductFilter(django_filters.FilterSet):
    class Meta:
        model = Product
        fields = (
            "gender",
            "for_kids",
            "category",
            "status",
            "publish_date",
        )
