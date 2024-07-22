from django.db import models
from django.contrib.gis.db import models as gis_models

# Defines bridges models
class Bridge(models.Model):
    name = models.CharField(max_length=100)
    location = gis_models.PointField(geography=True, srid=4326)
    inspection_date = models.DateField()
    status = models.CharField(max_length=50)
    traffic_load = models.IntegerField()

    class Meta:
        db_table = 'bridges'

    def __str__(self):
        """
        Returns a string representation of the object.
        
        Output:
            str: The name of the bridge.
        """
        return self.name
