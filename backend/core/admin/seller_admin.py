from django.contrib import admin

from core.models.product import Product
from core.models.sale import Sale
from core.models.sale_item import SaleItem
from core.models.seller import Seller


class SellerAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)
    list_display = ("id", "name", "email", "phone")
    search_fields = ("id", "name", "email")


admin.site.register(Seller, SellerAdmin)


