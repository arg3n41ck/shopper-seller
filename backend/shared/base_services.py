import json

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings


class BaseEmailService:
    def send_plain_email(self, subject, message, recipient_list):
        """
        Sends a plain text email.

        :param subject: Subject of the email.
        :param message: Content of the email in plain text format.
        :param recipient_list: List of recipients' email addresses.
        """
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list)

    def send_html_email(self, subject, html_message, recipient_list):
        """
        Sends an email with HTML content.

        :param subject: Subject of the email.
        :param html_message: HTML content of the email.
        :param recipient_list: List of recipients' email addresses.
        """
        send_mail(subject, '', settings.DEFAULT_FROM_EMAIL, recipient_list, html_message=html_message)

    def send_template_email(self, subject, template_name, context, recipient_list):
        """
        Sends an email using a template.

        :param subject: Subject of the email.
        :param template_name: Name of the email template.
        :param context: Context data to render the template.
        :param recipient_list: List of recipients' email addresses.
        """
        html_message = render_to_string(template_name, context)
        self.send_html_email(subject, html_message, recipient_list)


class BaseFileService:
    def __init__(self, file_path: str):
        self.file_path = file_path

    def read(self):
        try:
            with open(self.file_path, 'r') as f:
                return f.read()
        except FileNotFoundError:
            return None

    def read_json(self):
        try:
            with open(self.file_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return None

    def write_to_json(self, data):
        with open(self.file_path, 'w') as f:
            json.dump(data, f, indent=4)
