from django.conf import settings


if settings.DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = [
        "https://shopper.kg",
        "https://www.shopper.kg"
    ]


CSRF_TRUSTED_ORIGINS = [
    "https://shopper.kg",
    "https://www.shopper.kg",
]

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
