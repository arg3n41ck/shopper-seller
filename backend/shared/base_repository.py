from django.db import models
from typing import Type, List, Tuple, Union, TypeVar


# Type variable for the model class
ModelType = TypeVar("ModelType", bound=models.Model)


class BaseRepository:
    def __init__(self, model: Type[ModelType]):
        self.model = model

    def get(self, **kwargs) -> Union[ModelType, None]:
        try:
            return self.model.objects.get(**kwargs)
        except self.model.DoesNotExist:
            return None

    def get_all(self) -> List[ModelType]:
        return self.model.objects.all()

    def get_or_create(self, **kwargs) -> Tuple[ModelType, bool]:
        return self.model.objects.get_or_create(**kwargs)

    def create(self, **kwargs) -> ModelType:
        return self.model.objects.create(**kwargs)

    def update(self, instance: models.Model, **kwargs) -> ModelType:
        for key, value in kwargs.items():
            setattr(instance, key, value)
        self.save(instance)
        return instance

    def delete(self, instance: ModelType) -> None:
        instance.delete()

    def save(self, instance: ModelType) -> None:
        instance.save()
