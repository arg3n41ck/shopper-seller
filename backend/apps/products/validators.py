from django.core.exceptions import ValidationError
from django.core.validators import DecimalValidator
from decimal import Decimal


def validate_size(value):
    if not isinstance(value, dict):
        raise ValidationError("Size must be a dictionary.")

    required_keys = {"size", "quantity", "price", "discount"}

    if not required_keys.issubset(value.keys()):
        raise ValidationError("Each size variant must have 'size', 'quantity', 'price', and 'discount' keys.")

    if not isinstance(value["size"], str):
        raise ValidationError("Size must be a string.")

    if not isinstance(value["quantity"], int) or value["quantity"] <= 0:
        raise ValidationError("Quantity must be a positive integer.")

    if "price" in value and value["price"] is not None:
        price = Decimal(str(value["price"]))
        decimal_validator = DecimalValidator(max_digits=10, decimal_places=2)
        decimal_validator(price)

    if "discount" in value and value["discount"] is not None:
        discount = value["discount"]
        if not isinstance(discount, int) or discount < 0 or discount > 100:
            raise ValidationError("Discount must be an integer between 0 and 100.")


def validate_size_variants(value):
    if not isinstance(value, dict):
        raise ValidationError("Size must be a dictionary.")

    required_keys = {"size", "quantity"}

    if not required_keys.issubset(value.keys()):
        raise ValidationError("Each size variant must have 'size' and 'quantity' keys.")

    if not isinstance(value["size"], str):
        raise ValidationError("Size must be a string.")

    if not isinstance(value["quantity"], int) or value["quantity"] <= 0:
        raise ValidationError("Quantity must be a positive integer.")


def validate_specifications(value):
    if not isinstance(value, list):
        raise ValidationError("Size variants must be a list of dictionaries.")

    for specification in value:
        if not isinstance(specification, dict):
            raise ValidationError("Each specification must be a dictionary.")

        required_keys = {"title", "value"}

        if not required_keys.issubset(specification.keys()):
            raise ValidationError("Each size variant must have 'title' and 'value' keys.")

        if not isinstance(specification["title"], str):
            raise ValidationError("Title must be a string.")

        if not isinstance(specification["value"], str):
            raise ValidationError("Value must be a string")
