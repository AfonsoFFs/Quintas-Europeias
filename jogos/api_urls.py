from django.urls import path
from .api_views import JogadorListAPI, JogoListAPI

urlpatterns = [
    path('jogadores/', JogadorListAPI.as_view(), name='api-jogadores'),
    path('jogos/', JogoListAPI.as_view(), name='api-jogos'),
]
