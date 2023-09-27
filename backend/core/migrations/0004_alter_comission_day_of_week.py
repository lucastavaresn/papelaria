# Generated by Django 4.2.5 on 2023-09-26 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_comission'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comission',
            name='day_of_week',
            field=models.CharField(choices=[('1', 'Domingo'), ('2', 'Segunda-feira'), ('3', 'Terça-feira'), ('4', 'Quarta-feira'), ('5', 'Quinta-feira'), ('6', 'Sexta-feira'), ('7', 'Sábado')], max_length=10),
        ),
    ]
