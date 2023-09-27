import django_filters
from core.models.sale import Sale

class DateRangeFilter(django_filters.DateFromToRangeFilter):
    class Meta:
        model = Sale
        fields = ['datetime']