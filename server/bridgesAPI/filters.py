import django_filters;
from .models import Bridge;

#create filter to enhance data manipulation
class BridgeFilter(django_filters.FilterSet):
    class Meta:
        model = Bridge
        fields = {
            'status': ['exact'],
            'inspection_date': ['exact'],
            'traffic_load': ['gte', 'lte'],  
        }
