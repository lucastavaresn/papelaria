from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient


class SellerComissionViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_seller_commission_with_dates(self):
        start_date = "2023-09-1"
        end_date = "2023-09-2"
        url = (
            "http://localhost:8000/api/seller-commissions/?"
            + f"start_date={start_date}&end_date={end_date}"
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_seller_commission_without_dates(self):
        url = "http://localhost:8000/api/seller-commissions/"

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
