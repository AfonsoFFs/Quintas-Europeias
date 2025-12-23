from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Jogador, Jogo
from .serializers import JogadorSerializer, JogoSerializer


class JogadorListAPI(APIView):
    def get(self, request):
        jogadores = Jogador.objects.filter(ativo=True)
        serializer = JogadorSerializer(jogadores, many=True)
        return Response(serializer.data)


class JogoListAPI(APIView):
    def get(self, request):
        jogos = Jogo.objects.all().order_by('-data')
        serializer = JogoSerializer(jogos, many=True)
        return Response(serializer.data)
