from django.core.exceptions import ValidationError
from django.test import TestCase

from core.models.product import Product


class ProductTestCase(TestCase):
    def test_product_creation(self):
        product = Product.objects.create(
            code="P001",
            description="Produto A",
            unit_value=10.0,
            commission_percentage=5.0,
        )
        self.assertEqual(product.code, "P001")

    def test_code_field_required(self):
        with self.assertRaises(ValidationError) as context:
            product = Product(
                description="Produto A", unit_value=10.0, commission_percentage=5.0
            )
            product.full_clean()

        self.assertIn("code", context.exception.message_dict)
        self.assertEqual(
            context.exception.message_dict["code"][0],
            "Este campo não pode estar vazio.",
        )

    def test_description_field_required(self):
        with self.assertRaises(ValidationError) as context:
            product = Product(code="P001", unit_value=10.0, commission_percentage=5.0)
            product.full_clean()

        self.assertIn("description", context.exception.message_dict)
        self.assertEqual(
            context.exception.message_dict["description"][0],
            "Este campo não pode estar vazio.",
        )

    def test_unit_value_field_required(self):
        with self.assertRaises(ValidationError) as context:
            product = Product(
                code="P001", description="Produto A", commission_percentage=5.0
            )
            product.full_clean()

        self.assertIn("unit_value", context.exception.message_dict)
        self.assertEqual(
            context.exception.message_dict["unit_value"][0],
            "Este campo não pode ser nulo.",
        )
