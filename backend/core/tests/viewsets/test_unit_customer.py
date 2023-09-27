from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from core.models.customer import Customer


class CustomerViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def create_customer_data(self):
        customer_data = {
            "name": "Cliente de Exemplo",
            "email": "cliente@example.com",
            "phone": "123456789",
        }
        return customer_data

    def test_create_customer(self):
        customer_data = self.create_customer_data()
        url = "http://localhost:8000/api/customers/"

        response = self.client.post(url, customer_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_customers(self):
        url = "http://localhost:8000/api/customers/"

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_customer(self):
        customer_data = self.create_customer_data()
        customer = Customer.objects.create(**customer_data)
        url = f"http://localhost:8000/api/customers/{customer.id}/"

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_customer(self):
        customer_data = self.create_customer_data()
        customer = Customer.objects.create(**customer_data)

        updated_customer_data = self.create_customer_data()
        updated_customer_data["phone"] = "987654321"
        url = f"http://localhost:8000/api/customers/{customer.id}/"

        response = self.client.put(url, updated_customer_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_customer(self):
        customer_data = self.create_customer_data()
        customer = Customer.objects.create(**customer_data)
        url = f"http://localhost:8000/api/customers/{customer.id}/"

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
