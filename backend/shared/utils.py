import random
import string
import uuid


def generate_random_string(length: int) -> str:
    characters = string.ascii_lowercase + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


def unique_uuid4():
    return uuid.uuid4().hex
