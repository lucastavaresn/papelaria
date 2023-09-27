from rest_framework import serializers

from core.models.seller import Seller



class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__'
    