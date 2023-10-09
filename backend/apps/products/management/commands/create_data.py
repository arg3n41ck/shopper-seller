from django.core.management.base import BaseCommand

from apps.products.factories import CategoryFactory, TagFactory, ProductFactory
from apps.accounts.factories import UserCustomerFactory
from apps.customers.factories import CustomerFactory


class Command(BaseCommand):
    help = 'Check CategoryFactory'

    def handle(self, *args, **options):
        try:
            category = CustomerFactory()
            self.stdout.write(self.style.SUCCESS(f'Successfully created: {category}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error creating: {str(e)}'))
