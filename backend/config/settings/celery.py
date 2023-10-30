

# Celery Configuration
CELERY_BROKER_URL = 'redis://localhost:6379/0'  # or your preferred message broker
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
