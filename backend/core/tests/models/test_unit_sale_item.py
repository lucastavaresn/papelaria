from django.test import TestCase
from django.utils import timezone

from core.models.customer import Customer
from core.models.product import Product
from core.models.sale import Sale
from core.models.sale_item import SaleItem
from core.models.seller import Seller


class SaleItemTestCase(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create(
            name="Cliente Teste", email="cliente@teste.com", phone="123-456-7890"
        )
        self.seller = Seller.objects.create(
            name="Vendedor Teste", email="vendedor@teste.com", phone="987-654-3210"
        )
        self.product = Product.objects.create(
            code="P001",
            description="Produto Teste",
            unit_value=10.0,
            commission_percentage=5.0,
        )
        self.sale = Sale.objects.create(
            invoice="12345",
            datetime=timezone.now(),
            customer=self.customer,
            seller=self.seller,
        )

    def test_sale_item_creation(self):
        sale_item = SaleItem.objects.create(
            sale=self.sale, product=self.product, sold_amount=2
        )

        self.assertEqual(sale_item.sale, self.sale)
        self.assertEqual(sale_item.product, self.product)
        self.assertEqual(sale_item.sold_amount, 2)

    def test_sale_item_sold_amount_positive(self):
        with self.assertRaises(Exception):
            SaleItem.objects.create(
                sale=self.sale, product=self.product, sold_amount=-1
            )
