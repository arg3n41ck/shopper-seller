import django_filters

from apps.products.models import Product


class ProductFilter(django_filters.FilterSet):
    shop = django_filters.CharFilter(field_name="shop__slug", lookup_expr="iexact")
    category = django_filters.CharFilter(field_name="category__slug", lookup_expr="iexact")
    gender = django_filters.CharFilter(field_name="gender", lookup_expr="iexact")
    status = django_filters.CharFilter(field_name="status", lookup_expr="iexact")

    class Meta:
        model = Product
        fields = (
            "shop",
            "category",
            "gender",
            "status",
        )
