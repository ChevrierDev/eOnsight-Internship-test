from django.shortcuts import render
from rest_framework import generics
from .models import Bridge
from .serializers import BridgeSerializers  

#retrieve Bridge list data
class BridgeList(generics.ListCreateAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers
    
#retrieve Bridge details, update , delete or post Bridge
class BridgeDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers





