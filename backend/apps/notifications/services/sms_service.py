import requests

from xml.etree import ElementTree
from typing import Optional

from django.conf import settings
from django.utils.translation import gettext_lazy as _

from apps.notifications.models import NotificationSMSPro


class SMSProRepository:
    BASE_URL = " https://smspro.nikita.kg/api"

    def __init__(self):
        self.login = settings.SMS_PRO_LOGIN
        self.password = settings.SMS_PRO_PASSWORD

    def _make_request(self, method, endpoint, xml_data: str = None):
        url = f"{self.BASE_URL}/{endpoint}"
        headers = {
            "Content-Type": "application/xml",
        }
        try:
            response = method(url, data=xml_data, headers=headers)
            response.raise_for_status()  # Raise HTTPError for non-2xx responses
            return response.content
        except requests.exceptions.RequestException as e:
            # Handle HTTP request errors here (e.g., connection issues, timeouts)
            # Log the error or raise a custom exception as needed
            return None

    def request_send_sms(self, xml_data: str) -> Optional[str]:
        return self._make_request(requests.post, "message", xml_data)


class SMSProService:
    MESSAGES = {
        0: _("Messages successfully accepted for sending"),
        1: _("Request format error"),
        2: _("Invalid authentication"),
        3: _("Invalid sender IP address"),
        4: _("Insufficient funds in the client's account. This status is returned if the client's account "
             "does not have enough funds to send all SMS parts for all phone numbers specified in the request"),
        5: _("Invalid sender name (the 'sender' field value in the request is not validated "
             "by the smspro.nikita.kg administrator)"),
    }

    def __init__(self):
        self.notification_sms_model = NotificationSMSPro
        self.repository = SMSProRepository()

    def send_sms(self, phone_numbers: list[str], text: str) -> None:
        # Create an XML request based on your previous XML structure
        notification = self.notification_sms_model.objects.create(
            text=text,
            phone_numbers=[phone_numbers]
        )
        xml_data = f"""
        <?xml version="1.0" encoding="UTF-8"?>
        <message>
            <login>{self.repository.login}</login>
            <pwd>{self.repository.password}</pwd>
            <id>{notification.id}</id>
            <sender>SHOPPER</sender>
            <text>{notification.text}</text>
            <time>{notification.format_created_at}</time>
            <phones>
                {"".join(f'<phone>{phone}</phone>' for phone in notification.phone_numbers)}
            </phones>
            <test>1</test>
        </message>
                """
        # Remove <test>1<test> in production

        response = self.repository.request_send_sms(xml_data=xml_data)
        root = self._parse_response_xml(response=response)

        notification.response = {
            "id": root.find("id").text,
            "status": root.find("status").text,
            "status_message": self.MESSAGES.get(int(root.find("status").text),
                                                _("Unknown message")),
            "phones": root.find("phones").text,
            "smscnt": root.find("smscnt").text,
            "message": root.find("message").text,
        }
        notification.save()

    def _parse_response_xml(self, response):
        root = ElementTree.fromstring(response)
        return root
