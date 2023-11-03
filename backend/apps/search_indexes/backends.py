from django_elasticsearch_dsl_drf.filter_backends import FilteringFilterBackend

from apps.sellers.models import Seller


class OwnerFilterBackend(FilteringFilterBackend):
    def filter_queryset(self, request, queryset, view):
        # Get the user making the request
        user = request.user.seller

        # Define your custom filter criteria here
        if isinstance(user, Seller):
            # Filter documents by the seller (owner)
            queryset = queryset.filter(shop__seller=user)
            print(queryset)

        return queryset
