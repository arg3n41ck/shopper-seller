

class DynamicSerializerMixin:
    """
    A mixin that allows you to use different serializers for different actions.
    """

    serializer_classes = {}

    def get_serializer_class(self):
        """
        Return the serializer class based on the action being performed.
        """
        if self.action in self.serializer_classes:
            return self.serializer_classes[self.action]
        return super().get_serializer_class()
