from rest_framework import serializers

from core.models.sale_item import SaleItem
from core.serializers.product_serializer import ProductSerializer


class SaleItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = SaleItem
        fields = "__all__"
