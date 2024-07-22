from django.urls import path
from .views import BridgeList, BridgeDetails

urlpatterns = [
    path('bridges/', BridgeList.as_view()),
    path('bridges/<int:pk>/', BridgeDetails.as_view()),
]
