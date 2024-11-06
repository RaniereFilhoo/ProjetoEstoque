from django.db import models

class Produto(models.Model):
    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.IntegerField()

    def __str__(self):
        return f'{self.nome} - unidade: R${self.preco} - x{self.quantidade}'

class Fornecedor(models.Model):
    nome = models.CharField(max_length=100)
    contato = models.CharField(max_length=100)
    produto_fornecido = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
class Pedido(models.Model):
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField()
    data = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Pedido de {self.quantidade} {self.produto.nome}'