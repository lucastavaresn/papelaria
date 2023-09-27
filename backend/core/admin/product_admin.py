from django.contrib import admin

from core.models.product import Product


class ProductAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)
    list_display = ("id", "code", "description", "unit_value", "commission_percentage")
    search_fields = ("id", "code", "description")


admin.site.register(Product, ProductAdmin)
