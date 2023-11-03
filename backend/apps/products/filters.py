import django_filters

from django.db.models import Q

from apps.products.models import Product, Category


class SellerProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(method="category_filter")
    colors = django_filters.CharFilter(method="colors_filter")
    sizes = django_filters.CharFilter(method="sizes_filter")

    class Meta:
        model = Product
        fields = (
            "gender",
            "for_kids",
            "category",
            "status",
            "publish_date",
            "colors",
            "sizes",
        )

    def sizes_filter(self, queryset, name, value):
        sizes = self._split_params(value=value)

        query = Q()

        for size in sizes:
            query |= Q(variants__size_variants__contains=[{"size": size}])

        return queryset.filter(query).distinct()

    def colors_filter(self, queryset, name, value):
        colors = self._split_params(value=value)

        query = Q()

        for color in colors:
            query |= Q(variants__title=color)

        return queryset.filter(query).distinct()

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

    def _split_params(self, value: str) -> list[str]:
        return value.split(";")

