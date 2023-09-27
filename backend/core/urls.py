from django.urls import path

from core.viewsets.customer_view import CustomerDetailView, CustomerListView
from core.viewsets.product_view import ProductDetailView, ProductListView
from core.viewsets.sale_view import SaleViewSet
from core.viewsets.seller_view import (SellerComissionViewSet,
                                       SellerDetailView, SellerListView)

urlpatterns = [
    path("customer/", CustomerListView.as_view()),
    path("customer/<int:pk>/", CustomerDetailView.as_view()),
    path("product/", ProductListView.as_view()),
    path("product/<int:pk>/", ProductDetailView.as_view()),
    path("sale/", SaleViewSet.as_view({"post": "create", "get": "list"})),
    path(
        "sale/<int:pk>/",
        SaleViewSet.as_view(
            {"get": "retrivee", "delete": "delete", "update": "update"}
        ),
    ),
    path("seller/", SellerListView.as_view()),
    path("seller/<int:pk>/", SellerDetailView.as_view()),
    path("seller_comission/", SellerComissionViewSet.as_view({"get": "list"})),
]
