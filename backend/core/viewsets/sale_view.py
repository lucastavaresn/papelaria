from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from core.models.customer import Customer
from core.models.product import Product
from core.models.sale import Sale
from core.models.sale_item import SaleItem
from core.models.seller import Seller
from core.serializers.sale_serializer import SaleSerializer


class SaleViewSet(viewsets.ModelViewSet):
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()

    def get_serializer_class(self):
        return SaleSerializer

    def create(self, request):
  
        seller_id = request.data['seller']
        customer_id = request.data['customer']
        invoice = request.data['invoice']
        datetime = request.data['datetime']
        products = request.data['products']

        customer = Customer.objects.get(id=customer_id)
        seller = Seller.objects.get(id=seller_id)

        sale = Sale.objects.create(seller=seller, customer=customer, invoice=invoice, datetime=datetime)
        for product in products:
            product_object = Product.objects.get(id=product["product"])
            SaleItem.objects.create(sale=sale, product=product_object, sold_amount=product["quantity"])

        return Response(sale)

    def list(self, request):
        sale = self.queryset.all()
        serializer = SaleSerializer(sale, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk):
        sale = self.queryset.get(pk=pk)
        serializer = SaleSerializer(sale)
        return Response(serializer.data)
    
    def update(self, request, pk):
        sale = self.queryset.get(pk=pk)

        sale.vendedor = request.data['seller']
        sale.cliente = request.data['costumer']
        sale.invoice = request.data['invoice']
        sale.datetime = request.data['datetime']

        sale.save()

        serializer = SaleSerializer(sale)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        sale = self.queryset.get(pk=pk)

        sale.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)