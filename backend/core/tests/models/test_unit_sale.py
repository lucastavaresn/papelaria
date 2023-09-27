from django.core.exceptions import ValidationError
from django.test import TestCase
from django.utils import timezone

from core.models.customer import Customer
from core.models.product import Product
from core.models.sale import Sale
from core.models.sale_item import SaleItem
from core.models.seller import Seller


class SaleTestCase(TestCase):
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

    def test_sale_creation(self):
        sale = Sale.objects.create(
            invoice="12345",
            datetime=timezone.now(),
            customer=self.customer,
            seller=self.seller,
        )
        sale_item = SaleItem.objects.create(
            sale=sale, product=self.product, sold_amount=1
        )

        self.assertEqual(sale_item.sold_amount, 1)
        self.assertEqual(sale.invoice, "12345")
        self.assertEqual(sale.customer, self.customer)
        self.assertEqual(sale.seller, self.seller)

    def test_sale_invoice_unique(self):
        Sale.objects.create(
            invoice="12345",
            datetime=timezone.now(),
            customer=self.customer,
            seller=self.seller,
        )

        with self.assertRaises(ValidationError) as context:
            duplicate_sale = Sale(
                invoice="12345",
                datetime=timezone.now(),
                customer=self.customer,
                seller=self.seller,
            )
            duplicate_sale.full_clean()

            self.assertIn("invoice", context.exception.message_dict)
        self.assertEqual(
            context.exception.message_dict["invoice"][0],
            "Venda com este Número nota fiscal já existe.",
        )

    def test_sale_datetime(self):
        sale = Sale.objects.create(
            invoice="12345",
            datetime=timezone.now(),
            customer=self.customer,
            seller=self.seller,
        )
        self.assertIsInstance(sale.datetime, timezone.datetime)
