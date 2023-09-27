from django.test import TestCase

from core.models.seller import Seller


class SellerTestCase(TestCase):
    def test_seller_creation(self):
        seller = Seller.objects.create(
            name="João", email="joao@example.com", phone="123-456-7890"
        )
        self.assertEqual(seller.name, "João")

    def test_seller_phone_blank(self):
        seller = Seller.objects.create(name="Rafael", email="rafael@example.com")
        self.assertEqual(seller.phone, "")
