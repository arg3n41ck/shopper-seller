from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings


class BaseEmailService:
    EMAIL_HOST_USER = settings.EMAIL_HOST_USER

    def send_email(self, subject, message, recipient_list, from_email=None):
        if from_email is None:
            from_email = self.EMAIL_HOST_USER

        send_mail(
            subject=subject,
            message=message,
            from_email=from_email,
            recipient_list=recipient_list,
            fail_silently=False,
        )

    def send_template_email(self, subject, template_name, context, recipient_list, from_email=None):
        message = render_to_string(template_name, context)
        self.send_email(subject, message, recipient_list, from_email)
