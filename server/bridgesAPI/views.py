from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Bridge
from .serializers import BridgeSerializers  
from .filters import BridgeFilter  

# set pagination for the API with a page size of 10
class BridgeListPagination(PageNumberPagination):
    page_size = 10

# class to get all bridges and add filtering features
class BridgeList(generics.ListCreateAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_class = BridgeFilter
    pagination_class = BridgeListPagination

    # override the list method to conditionally disable pagination
    def list(self, request, *args, **kwargs):
        """
        Disable pagination for bridge search when receiving the no_pagination parameter in the request.
        """
        no_pagination = request.query_params.get('no_pagination', None)
        if no_pagination is not None:
            self.pagination_class = None
        return super().list(request, *args, **kwargs)

# class to retrieve, update, or delete a specific bridge
class BridgeDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bridge.objects.all()
    serializer_class = BridgeSerializers

# Class to handle searching bridges by name
class BridgeSearchByName(APIView):
    def get(self, request, *args, **kwargs):
        """
        Handle GET requests for searching bridges by name.
        """
        name = request.query_params.get('name', None)
        if name is not None:
            bridges = Bridge.objects.filter(name__icontains=name)
            serializer = BridgeSerializers(bridges, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Name parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
