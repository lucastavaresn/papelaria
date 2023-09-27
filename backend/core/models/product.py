from django.db import models


class Product(models.Model):
    code = models.CharField(max_length=20, unique=True, verbose_name="Código")
    description = models.CharField(max_length=200, verbose_name="Descrição")
    unit_value = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Valor unitário")
    commission_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00, verbose_name="Percentual de comissão")

    class Meta:
        verbose_name = "Produto"

    def __str__(self):
        return self.description