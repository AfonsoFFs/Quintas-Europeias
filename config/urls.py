from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jogos.api_urls')),
    path('accounts/', include('django.contrib.auth.urls')),

    # Catch-all para o React
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
