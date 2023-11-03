from django_elasticsearch_dsl_drf.pagination import LimitOffsetPagination


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
