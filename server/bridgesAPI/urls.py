from django.urls import path
from .views import BridgeList, BridgeDetails, BridgeSearchByName

urlpatterns = [
    path('bridges/', BridgeList.as_view()),
    path('bridges/<int:pk>/', BridgeDetails.as_view()),
    path('bridges/search/', BridgeSearchByName.as_view()), 
]
