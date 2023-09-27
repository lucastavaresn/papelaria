from django.contrib import admin

from core.models.customer import Customer

class CustomerAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)
    list_display = ("id", "email", "phone")
    search_fields = ("id", "email", "phone")

admin.site.register(Customer, CustomerAdmin)