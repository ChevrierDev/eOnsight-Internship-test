from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from .models import Bridge
from .serializers import BridgeSerializers  
from rest_framework.views import APIView
from rest_framework import status

#retrieve Bridge list data
class BridgeList(generics.ListCreateAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers
    
#retrieve Bridge details, update , delete or post Bridge
class BridgeDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers





