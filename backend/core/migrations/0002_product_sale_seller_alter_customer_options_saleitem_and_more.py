# Generated by Django 4.2.5 on 2023-09-26 18:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=20, unique=True, verbose_name='Código')),
                ('description', models.CharField(max_length=200, verbose_name='Descrição')),
                ('unit_value', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Valor unitário')),
                ('commission_percentage', models.DecimalField(decimal_places=2, default=0.0, max_digits=5, verbose_name='Percentual de comissão')),
            ],
            options={
                'verbose_name': 'Produto',
            },
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoice', models.CharField(max_length=20, unique=True, verbose_name='Número nota fiscal')),
                ('datetime', models.DateTimeField(verbose_name='Data e hora')),
            ],
            options={
                'verbose_name': 'Venda',
            },
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Nome')),
                ('email', models.EmailField(max_length=254, verbose_name='E-mail')),
                ('phone', models.CharField(max_length=20, verbose_name='Telefone')),
            ],
            options={
                'verbose_name': 'Vendedor',
                'verbose_name_plural': 'Vendedores',
            },
        ),
        migrations.AlterModelOptions(
            name='customer',
            options={'verbose_name': 'Cliente'},
        ),
        migrations.CreateModel(
            name='SaleItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sold_amount', models.PositiveIntegerField(verbose_name='Quantidade vendida')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.product', verbose_name='Produto')),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sale', verbose_name='Venda')),
            ],
            options={
                'verbose_name': 'Item da venda',
                'verbose_name_plural': 'Itens da venda',
            },
        ),
        migrations.AddField(
            model_name='sale',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.customer', verbose_name='Cliente'),
        ),
        migrations.AddField(
            model_name='sale',
            name='products',
            field=models.ManyToManyField(through='core.SaleItem', to='core.product', verbose_name='Produtos'),
        ),
        migrations.AddField(
            model_name='sale',
            name='seller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.seller', verbose_name='Vendedor'),
        ),
    ]