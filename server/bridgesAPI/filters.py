import django_filters
from .models import Bridge

class BridgeFilter(django_filters.FilterSet):
    # filter for name with case insensitive containment
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains') 

    class Meta:
        model = Bridge
        fields = {
            'status': ['exact'], 
            'inspection_date': ['exact'],
            'traffic_load': ['gte', 'lte'], 
            'name': ['icontains'],  
        }
