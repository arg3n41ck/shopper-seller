import django_filters

from apps.products.models import Product, Category


class SellerProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(method="category_filter")

    class Meta:
        model = Product
        fields = (
            "gender",
            "for_kids",
            "category",
            "status",
            "publish_date",
        )

    def category_filter(self, queryset, name, value):
        if category := Category.objects.filter(slug=value).first():
            category_slug_lst = [
                value,
            ]
            self._collect_categories(category, category_slug_lst)
            return queryset.filter(category__slug__in=category_slug_lst)
        return queryset

    def _collect_categories(self, category, category_slug_lst):
        if hasattr(category, "children"):
            for child in category.children.all():
                category_slug_lst.append(child.slug)
                self._collect_categories(child, category_slug_lst)
        return category_slug_lst


