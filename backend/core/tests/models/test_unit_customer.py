from django.test import TestCase

from core.models.customer import Customer


class CustomerTestCase(TestCase):
    def test_customer_creation(self):
        customer = Customer.objects.create(
            name="João", email="joao@example.com", phone="123-456-7890"
        )
        self.assertEqual(customer.name, "João")

    def test_customer_phone_blank(self):
        customer = Customer.objects.create(name="Rafael", email="rafael@example.com")
        self.assertEqual(customer.phone, "")
