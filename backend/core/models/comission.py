from django.db import models

DAY_OF_WEEK_CHOICES = (
    ('1', 'Domingo'),
    ('2', 'Segunda-feira'),
    ('3', 'Terça-feira'),
    ('4', 'Quarta-feira'),
    ('5', 'Quinta-feira'),
    ('6', 'Sexta-feira'),
    ('7', 'Sábado'),
)

class Comission(models.Model):
    day_of_week = models.CharField(max_length=10, choices=DAY_OF_WEEK_CHOICES, verbose_name="Dia da semana")
    min_commission = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Comissão Mínima")
    max_commission = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Comissão Máxima")

    class Meta:
        verbose_name = "Comissão"
        verbose_name_plural = "Comissões"