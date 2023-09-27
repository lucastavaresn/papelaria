from django.urls import path

from core.viewsets.customer_view import CustomerDetailView, CustomerListView
from core.viewsets.product_view import ProductDetailView, ProductListView
from core.viewsets.sale_view import SaleViewSet
from core.viewsets.seller_view import (SellerComissionViewSet,
                                       SellerDetailView, SellerListView)

urlpatterns = [
    path("customers/", CustomerListView.as_view()),
    path("customers/<int:pk>/", CustomerDetailView.as_view()),
    path("products/", ProductListView.as_view()),
    path("products/<int:pk>/", ProductDetailView.as_view()),
    path("sales/", SaleViewSet.as_view({"post": "create", "get": "list"})),
    path(
        "sales/<int:pk>/",
        SaleViewSet.as_view(
            {"get": "retrieve", "delete": "delete", "update": "update"}
        ),
    ),
    path("sellers/", SellerListView.as_view()),
    path("sellers/<int:pk>/", SellerDetailView.as_view()),
    path("seller-commissions/", SellerComissionViewSet.as_view({"get": "list"})),
]
