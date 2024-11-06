from rest_framework import viewsets, permissions
from estoqueapp import models
from estoqueapp.api import serializers

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = models.Produto.objects.all()
    serializer_class = serializers.ProdutoSerializer
    permission_classes = [permissions.IsAuthenticated]

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = models.Fornecedor.objects.all()
    serializer_class = serializers.FornecedorSerializer
    permission_classes = [permissions.IsAuthenticated]

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = models.Pedido.objects.select_related('produto').all()
    serializer_class = serializers.PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]