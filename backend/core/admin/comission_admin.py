from django.contrib import admin

from core.models.comission import Comission


class ComissionAdmin(admin.ModelAdmin):
    readonly_fields = ("id",)
    list_display = ("id", "day_of_week", "min_commission", "max_commission")
    search_fields = ("id", "day_of_week")

admin.site.register(Comission, ComissionAdmin)