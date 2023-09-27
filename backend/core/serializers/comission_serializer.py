from rest_framework import serializers

from core.models.comission import Comission


class CommissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comission
        fields = "__all__"
