from rest_framework import generics, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from core.models.comission import Comission
from core.models.customer import Customer
from core.models.sale import Sale

from core.models.seller import Seller
from core.serializers.customer_serializer import CustomerSerializer
from core.serializers.sale_serializer import SaleSerializer
from core.serializers.seller_serializer import SellerSerializer
from core.utils.utils import DateRangeFilter


class SellerListView(generics.ListCreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer

class SellerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class SellerComissionViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer

    def list(self, request):
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        if not start_date or not end_date:
            return Response({'error': 'É necessário fornecer as datas de início e fim.'}, status=400)

        sales = Sale.objects.filter(datetime__range=[start_date, end_date])

        data = []
        for sale in sales:
            customer = sale.customer
            sale_items = sale.saleitem_set.all()
            sale_data = {
                'customer': {
                    'id': customer.id,
                    'name': customer.name,
                },
                'datetime': sale.datetime,
                'products': [
                    {
                        'product_id': item.product.id,
                        'product_name': item.product.description,
                        'sold_amount': item.sold_amount,
                        'commission_percentage': item.product.commission_percentage,
                    }
                    for item in sale_items
                ],
            }
            data.append(sale_data)

        return Response(data)