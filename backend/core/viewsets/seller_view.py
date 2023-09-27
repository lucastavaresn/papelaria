from datetime import datetime
from decimal import Decimal

from rest_framework import generics, viewsets
from rest_framework.response import Response

from core.models.comission import Comission
from core.models.sale import Sale
from core.models.sale_item import SaleItem
from core.models.seller import Seller
from core.serializers import seller_comission_serializer
from core.serializers.seller_serializer import SellerSerializer


class SellerListView(generics.ListCreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class SellerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class SellerComissionViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = seller_comission_serializer

    def list(self, request):
        start_date_str = request.query_params.get("start_date")
        end_date_str = request.query_params.get("end_date")

        if not start_date_str or not end_date_str:
            return Response(
                {"error": "É necessário fornecer as datas de início e fim."}, status=400
            )

        start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
        end_date = datetime.strptime(end_date_str, "%Y-%m-%d")

        sellers = Seller.objects.all()

        data = []
        for seller in sellers:
            sales = Sale.objects.filter(
                seller=seller, datetime__date__range=(start_date, end_date)
            )
            total_sale = sales.count()
            total_commission = Decimal("0.00")

            for sale in sales:
                sale_items = SaleItem.objects.filter(sale=sale)
                for item in sale_items:
                    commission_percentage = item.product.commission_percentage
                    unit_value = item.product.unit_value
                    sold_amount = item.sold_amount
                    # Obter o dia da semana atual como número (0 = segunda-feira, 1 = terça-feira, ..., 6 = domingo)
                    day_of_week = sale.datetime.weekday()

                    # Ajustar o dia da semana para corresponder à convenção (1 = domingo, 2 = segunda-feira, ..., 7 = sábado)
                    day_of_week = (day_of_week + 2) % 7

                    comission_limits = Comission.objects.get(
                        day_of_week=str(day_of_week)
                    )

                    # Aplicar os limites mínimos e máximos de comissão
                    if commission_percentage < Decimal(comission_limits.min_commission):
                        commission_percentage = Decimal(comission_limits.min_commission)
                    elif commission_percentage > Decimal(
                        comission_limits.max_commission
                    ):
                        commission_percentage = Decimal(comission_limits.max_commission)

                    comission = (
                        sold_amount * unit_value * commission_percentage
                    ) / Decimal("100.0")
                    total_commission += comission

            seller_data = {
                "code": seller.id,
                "seller": seller.name,
                "totalSale": total_sale,
                "commission": float(total_commission),
            }
            data.append(seller_data)

        return Response(data)
