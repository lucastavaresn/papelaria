from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from core.models.product import Product


class ProductViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def create_product_data(self):
        product_data = {
            "code": "P001",
            "description": "Produto de Exemplo",
            "unit_value": 10.0,
            "commission_percentage": 5.0,
        }
        return product_data

    def test_create_product(self):
        product_data = self.create_product_data()
        url = "http://localhost:8000/api/products/"

        response = self.client.post(url, product_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_products(self):
        url = "http://localhost:8000/api/products/"

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_product(self):
        product_data = self.create_product_data()
        product = Product.objects.create(**product_data)
        url = f"http://localhost:8000/api/products/{product.id}/"

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_product(self):
        product_data = self.create_product_data()
        product = Product.objects.create(**product_data)
        updated_product_data = self.create_product_data()
        updated_product_data["unit_value"] = 15.0
        url = f"http://localhost:8000/api/products/{product.id}/"

        response = self.client.put(url, updated_product_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_product(self):
        product_data = self.create_product_data()
        product = Product.objects.create(**product_data)
        url = f"http://localhost:8000/api/products/{product.id}/"

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
