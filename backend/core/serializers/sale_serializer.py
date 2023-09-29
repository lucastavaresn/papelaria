from rest_framework import serializers

from core.models.sale import Sale
from core.models.sale_item import SaleItem
from core.serializers.customer_serializer import CustomerSerializer
from core.serializers.product_serializer import ProductSerializer
from core.serializers.sale_item_serializer import SaleItemSerializer
from core.serializers.seller_serializer import SellerSerializer


class SaleSerializer(serializers.ModelSerializer):
    seller = SellerSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    items = serializers.SerializerMethodField()

    class Meta:
        model = Sale
        fields = "__all__"

    def get_items(self, obj):
        sale_items = SaleItem.objects.filter(sale=obj)
        serializer = SaleItemSerializer(sale_items, many=True)
        return serializer.data