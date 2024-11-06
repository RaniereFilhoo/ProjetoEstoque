from rest_framework import routers
from estoqueapp.api import viewsets

rota = routers.DefaultRouter()
rota.register( 'produto' , viewsets.ProdutoViewSet)
rota.register( 'fornecedor' , viewsets.FornecedorViewSet)
rota.register( 'pedido' , viewsets.PedidoViewSet)