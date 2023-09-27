from django.db import models

from core.models.customer import Customer
from core.models.product import Product
from core.models.seller import Seller



class Sale(models.Model):
    invoice = models.CharField(max_length=20, unique=True, verbose_name="Número nota fiscal")
    datetime = models.DateTimeField(verbose_name="Data e hora")
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, verbose_name="Cliente")
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, verbose_name="Vendedor")
    products = models.ManyToManyField(Product, through='SaleItem', verbose_name="Produtos")

    class Meta:
        verbose_name = "Venda"

    def __str__(self):
        return self.invoice