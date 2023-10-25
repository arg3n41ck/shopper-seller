from rest_framework import viewsets
from rest_framework.filters import SearchFilter

from apps.products.models import (
    Category,
    Tag,
    Specification,
)
from apps.products.serializers import (
    CategorySerializer,
    TagSerializer,
    SpecificationSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer
    pagination_class = None
    lookup_field = "slug"

    def get_queryset(self):
        return (
            Category.objects.all()
            if self.kwargs.get(self.lookup_field)
            else Category.objects.root_nodes()
        )


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    filter_backends = [SearchFilter]
    search_fields = ["title"]
    pagination_class = None
    lookup_field = "slug"


class SpecificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Specification.objects.all()
    serializer_class = SpecificationSerializer
    filter_backends = [SearchFilter]
    search_fields = ["title"]
    pagination_class = None
    lookup_field = "slug"
