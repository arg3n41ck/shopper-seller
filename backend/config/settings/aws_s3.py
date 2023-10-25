import os

from django.conf import settings

# # AWS S3 Settings
# AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
# AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
# AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
# AWS_S3_REGION_NAME = os.environ['AWS_S3_REGION_NAME']
#
# # Set the AWS S3 custom domain (optional)
# AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
#
# # Set the URL for static and media files
# STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'
# MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
#
# # Use AWS S3 for static and media files
# DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
#
# # Additional settings for S3 (optional)
# AWS_S3_OBJECT_PARAMETERS = {
#     'CacheControl': 'max-age=86400',  # cache files for 24 hours
# }
#
# AWS_QUERYSTRING_AUTH = False  # disable querystring authentication


STATIC_URL = '/staticfiles/'
STATIC_ROOT = settings.BASE_DIR / 'staticfiles'
MEDIA_URL = '/media/'
MEDIA_ROOT = settings.BASE_DIR / 'media'
