from django.contrib.auth.models import AbstractUser
from django.db import models

class Jogador(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True, blank=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return self.nome

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    jogador = models.OneToOneField(Jogador, null=True, blank=True, on_delete=models.CASCADE)

class Jogo(models.Model):
    data = models.DateField()
    equipa_a = models.ManyToManyField(Jogador, related_name='equipa_a')
    equipa_b = models.ManyToManyField(Jogador, related_name='equipa_b')
    resultado_a = models.IntegerField(default=0)
    resultado_b = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.data} - {self.resultado_a} x {self.resultado_b}"

class Golo(models.Model):
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    jogador = models.ForeignKey(Jogador, on_delete=models.CASCADE)
    quantidade = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.jogador.nome} - {self.quantidade} golo(s)"
