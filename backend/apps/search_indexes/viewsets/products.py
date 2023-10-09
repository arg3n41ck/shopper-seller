from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_TERMS,
    LOOKUP_FILTER_RANGE,
    LOOKUP_FILTER_PREFIX,
    LOOKUP_FILTER_WILDCARD,
    LOOKUP_QUERY_IN,
    LOOKUP_QUERY_GT,
    LOOKUP_QUERY_GTE,
    LOOKUP_QUERY_LT,
    LOOKUP_QUERY_LTE,
    LOOKUP_QUERY_EXCLUDE,
)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    IdsFilterBackend,
    OrderingFilterBackend,
    DefaultOrderingFilterBackend,
    FacetedSearchFilterBackend,
    CompoundSearchFilterBackend,
)
from elasticsearch_dsl import (
    DateHistogramFacet,
    RangeFacet,
    TermsFacet,
)

from apps.search_indexes.documents.products import ProductDocument
from apps.search_indexes.serializers.products import ProductDocumentSerializer

# from Project.swagger import ELASTICSEARCH

from django_elasticsearch_dsl_drf.pagination import LimitOffsetPagination
from apps.products.models import Product


COMPARE_DICT = {
    'offset': None,
    'limit': None
}

COMPARE_DICT_2 = {
    'offset': None,
    'limit': None,
    'moisturizing__gte': None
}


class CustomLimitOffsetPagination(LimitOffsetPagination):
    def get_paginated_response_context(self, data):
        # this kostyl because of elastic's max window objects limit
        # if self.request.query_params:
        #     if self.request.query_params.keys() == COMPARE_DICT.keys():
        #         self.count = Product.objects.all().count()
        #     if self.request.query_params.keys() == COMPARE_DICT_2.keys():
        #         if self.request.query_params['moisturizing__gte'] == '0':
        #             self.count = Product.objects.all().count()
        # else:
        #     self.count = Product.objects.all().count()
        # products_count = Product.objects.count()
        # if self.count < products_count and self.count == 10000:
        #     self.count = products_count
        __facets = self.get_facets()
        self.count = __facets['_filter_freeoffs']['doc_count']
        __data = [
            ('count', self.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
        ]
        
        if __facets is not None:
            __data.append(
                ('facets', __facets),
            )
        __data.append(
            ('results', data),
        )
        return __data


class ProductDocumentViewSet(DocumentViewSet):
    document = ProductDocument
    serializer_class = ProductDocumentSerializer
    # pagination_class = CustomLimitOffsetPagination
    lookup_field = "id"
    filter_backends = [
        FilteringFilterBackend,
        IdsFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        FacetedSearchFilterBackend,
        CompoundSearchFilterBackend,
    ]
    search_fields = {
        "sku": {"fuzziness": "AUTO"},
        "title": {"fuzziness": "AUTO"}
    }
    faceted_search_fields = {}
    filter_fields = {}
    ordering_fields = {}
    ordering = ()
