from rest_framework import serializers

from core.models.seller import Seller


class SellerCommissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = ["id", "name", "totalSale", "commission"]
