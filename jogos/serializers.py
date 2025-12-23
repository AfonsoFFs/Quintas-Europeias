from rest_framework import serializers
from .models import Jogador, Jogo, Golo


class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ['id', 'nome']


class GoloSerializer(serializers.ModelSerializer):
    jogador = JogadorSerializer()

    class Meta:
        model = Golo
        fields = ['jogador', 'quantidade']


class JogoSerializer(serializers.ModelSerializer):
    equipa_a = JogadorSerializer(many=True)
    equipa_b = JogadorSerializer(many=True)
    golos = serializers.SerializerMethodField()

    class Meta:
        model = Jogo
        fields = [
            'id',
            'data',
            'equipa_a',
            'equipa_b',
            'resultado_a',
            'resultado_b',
            'golos',
        ]

    def get_golos(self, obj):
        golos = Golo.objects.filter(jogo=obj)
        return GoloSerializer(golos, many=True).data
