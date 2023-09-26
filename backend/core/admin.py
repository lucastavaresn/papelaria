from django.contrib import admin

from core.models.customer import Customer
from core.models.product import Product
from core.models.sale import Sale
from core.models.sale_item import SaleItem
from core.models.seller import Seller



# Register your models here.
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(SaleItem)
admin.site.register(Sale)
admin.site.register(Seller)
