from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework import status
from .models import Bridge
from .views import BridgeList, BridgeDetails

class BridgeAPITests(TestCase):

    def setUp(self):
        """
        Set up the test environment and create some initial Bridge instances.
        This method is called before every individual test method to ensure a consistent test environment.
        """
        self.factory = APIRequestFactory()
        
        # Create two initial Bridge instances for testing
        self.bridge1 = Bridge.objects.create(
            name="Golden Gate Bridge",
            location="SRID=4326;POINT(-122.4783 37.8199)",
            inspection_date="2023-01-01",
            status="Good",
            traffic_load=15000
        )
        self.bridge2 = Bridge.objects.create(
            name="Brooklyn Bridge",
            location="SRID=4326;POINT(-73.9969 40.7061)",
            inspection_date="2023-02-15",
            status="Fair",
            traffic_load=10000
        )

    def test_get_all_bridges(self):
        """
        Test retrieving the list of all bridges.
        """
        # Create a GET request for the list of bridges
        request = self.factory.get('/api/v1/bridges/')
        
        view = BridgeList.as_view()
        response = view(request)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify that the response contains the correct number of bridges
        self.assertEqual(len(response.data), 2)

    def test_get_single_bridge(self):
        """
        Test retrieving a single bridge by ID.
        """
        request = self.factory.get(f'/api/v1/bridges/{self.bridge1.id}/')
        
        view = BridgeDetails.as_view()
        response = view(request, pk=self.bridge1.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify that the response data matches the bridge's name
        self.assertEqual(response.data['name'], self.bridge1.name)

    def test_create_bridge(self):
        """
        Test creating a new bridge.
        """
        data = {
            "name": "New Bridge",
            "location": "SRID=4326;POINT(-75.0 40.0)",
            "inspection_date": "2023-04-01",
            "status": "Good",
            "traffic_load": 20000
        }
        
        request = self.factory.post('/api/v1/bridges/', data, format='json')
        
        view = BridgeList.as_view()
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(Bridge.objects.count(), 3)

    def test_update_bridge(self):
        """
        Test updating an existing bridge.
        """
        data = {
            "name": "Golden Gate Bridge Updated",
            "location": "SRID=4326;POINT(-122.4783 37.8199)",
            "inspection_date": "2023-01-01",
            "status": "Poor",
            "traffic_load": 16000
        }
        
        request = self.factory.put(f'/api/v1/bridges/{self.bridge1.id}/', data, format='json')
        
        view = BridgeDetails.as_view()
        response = view(request, pk=self.bridge1.id)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Refresh the bridge instance from the database
        self.bridge1.refresh_from_db()
        
        # Verify that the bridge's details have been updated
        self.assertEqual(self.bridge1.name, "Golden Gate Bridge Updated")
        self.assertEqual(self.bridge1.status, "Poor")
        self.assertEqual(self.bridge1.traffic_load, 16000)

    def test_delete_bridge(self):
        """
        Test deleting a bridge.
        """
        request = self.factory.delete(f'/api/v1/bridges/{self.bridge1.id}/')
        
        view = BridgeDetails.as_view()
        response = view(request, pk=self.bridge1.id)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        self.assertEqual(Bridge.objects.count(), 1)
