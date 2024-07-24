from rest_framework import serializers
from .models import Bridge

#Serialize data from Bridge model
class BridgeSerializers(serializers.ModelSerializer):
    STATUS_OPTIONS = ['Good', 'Fair', 'Poor', 'Bad']
    class Meta:
        model = Bridge
        fields = '__all__'
        
    def validate_status(self, value):
        """
        Validate the status field to ensure it contains a valid value.

        Returns:
            str: The validated value.
        """
        # if values in status_option return value
        if value not in self.STATUS_OPTIONS:
            raise serializers.ValidationError("Only options 'Good', 'Fair', 'Poor', or 'Bad' are allowed.")
        return value