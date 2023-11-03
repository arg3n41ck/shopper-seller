from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


api_urlpatterns = [
    path("accounts/", include("apps.accounts.urls")),
    path("products/", include("apps.products.urls")),
    path("customers/", include("apps.customers.urls")),
    path("sellers/", include("apps.sellers.urls")),
    path("orders/", include("apps.orders.urls")),
    path("elastic/", include("apps.search_indexes.urls")),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(api_urlpatterns))
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    from drf_yasg import openapi
    from drf_yasg.views import get_schema_view
    from rest_framework import permissions

    schema_view = get_schema_view(
        openapi.Info(
            title="Shopper API",
            default_version="v1",
            description="",
            terms_of_service="https://www.google.com/policies/terms/",
            contact=openapi.Contact(email="contact@snippets.local"),
            license=openapi.License(name="BSD License"),
        ),
        public=True,
        permission_classes=[permissions.AllowAny],
    )

    urlpatterns += [
        path('api/v1/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('api/v1/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    ]
