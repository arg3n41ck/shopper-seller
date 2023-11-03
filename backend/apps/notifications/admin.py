from django.contrib import admin

from apps.notifications.models import NotificationSMSPro


@admin.register(NotificationSMSPro)
class NotificationSMSProAdmin(admin.ModelAdmin):
    pass
