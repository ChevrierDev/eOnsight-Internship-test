from rest_framework import serializers
from .models import Bridge

#Serialize data from Bridge model
class BridgeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bridge,
        fields = ('__all__')