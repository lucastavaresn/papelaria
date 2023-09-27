from django.db import models

# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nome")
    email = models.EmailField(verbose_name="E-mail")
    phone = models.CharField(max_length=20, verbose_name="Telefone")

    class Meta:
        verbose_name = "Cliente"

    def __str__(self):
        return self.name