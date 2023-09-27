from django.db import models

from core.models.product import Product
from core.models.sale import Sale


class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE, verbose_name="Venda")
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, verbose_name="Produto"
    )
    sold_amount = models.PositiveIntegerField(verbose_name="Quantidade vendida")

    class Meta:
        verbose_name = "Item da venda"
        verbose_name_plural = "Itens da venda"

    def calculate_commission(self):
        return (
            self.product.unit_value * self.product.commission_percentage / 100
        ) * self.sold_amount

    def __str__(self):
        return (
            f"Item de Venda: {self.product.description} ({self.sold_amount} unidades)"
        )
