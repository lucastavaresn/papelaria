from datetime import datetime

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from core.models.customer import Customer
from core.models.product import Product
from core.models.seller import Seller


class SaleViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def create_sale_data(self):
        seller = Seller.objects.create(
            name="Vendedor de Exemplo", email="email@email.com", phone="2299999999"
        )
        customer = Customer.objects.create(
            name="Cliente de Exemplo", email="email@email.com", phone="2299999999"
        )
        product = Product.objects.create(
            code="P001",
            description="Produto de Exemplo",
            unit_value=10.0,
            commission_percentage=5.0,
        )
        sale_data = {
            "seller": seller.id,
            "customer": customer.id,
            "invoice": "12345",
            "datetime": datetime.now().isoformat(),
            "products": [{"product": product.id, "quantity": 2}],
        }
        return sale_data

    def test_create_sale(self):
        sale_data = self.create_sale_data()
        url = "http://localhost:8000/api/sales/"

        response = self.client.post(url, sale_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_sales(self):
        url = "http://localhost:8000/api/sales/"

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
