from rest_framework import serializers

from core.models.sale import Sale
from core.serializers.customer_serializer import CustomerSerializer
from core.serializers.product_serializer import ProductSerializer
from core.serializers.seller_serializer import SellerSerializer


class SaleSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    seller = SellerSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    class Meta:
        model = Sale
        fields = "__all__"
