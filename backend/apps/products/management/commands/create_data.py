from django.core.management.base import BaseCommand

from apps.factories.products import ProductFactory


class Command(BaseCommand):
    help = 'Check CategoryFactory'

    def handle(self, *args, **options):
        try:
            product = ProductFactory.create_batch(5)
            self.stdout.write(self.style.SUCCESS(f'Successfully created: {product}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error creating: {str(e)}'))
