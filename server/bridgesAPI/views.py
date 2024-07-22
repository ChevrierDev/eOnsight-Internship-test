from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from .models import Bridge
from .serializers import BridgeSerializers  

# Retrieve Bridge list data
class BridgeList(generics.ListCreateAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers
    filter_backends = [DjangoFilterBackend]  
    filterset_fields = ['status', 'inspection_date']

# Retrieve Bridge details, update, delete or post Bridge
class BridgeDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers