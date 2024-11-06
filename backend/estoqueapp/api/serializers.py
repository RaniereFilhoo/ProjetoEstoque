from rest_framework import serializers
from estoqueapp import models

class ProdutoSerializer(serializers.ModelSerializer):
   class Meta:
    model = models.Produto
    fields = '__all__'

class FornecedorSerializer(serializers.ModelSerializer):
   class Meta:
    model = models.Fornecedor
    fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.Pedido
      fields = '__all__'
   # def to_representation (self):
     