from django.contrib import admin
from .models import Produto, Fornecedor, Pedido

admin.site.register(Produto)
admin.site.register(Fornecedor)
admin.site.register(Pedido)
