from django.conf import settings


if settings.DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOW_ALL_ORIGINS = False
    CORS_ALLOWED_ORIGINS = [
        f"https://{settings.DOMAIN}",
        f"https://www.{settings.DOMAIN}"
    ]


CSRF_TRUSTED_ORIGINS = [
    f"https://{settings.DOMAIN}",
    f"https://www.{settings.DOMAIN}",
]

# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
