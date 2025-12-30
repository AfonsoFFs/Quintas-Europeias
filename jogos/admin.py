from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import PasswordResetForm, UserCreationForm
from django.contrib.auth import get_user_model
from django import forms
from django.contrib import messages
from .models import Jogador, Jogo, Golo


# Configurações globais do Admin
admin.site.site_header = "Quintas Europeias"
admin.site.site_title = "Quintas Europeias Admin"
admin.site.index_title = "Bem-vindo à administração das Quintas Europeias"
admin.site.site_url = "https://quintaseuropeias.onrender.com"

User = get_user_model()

#############################
# FORMULÁRIO COM VALIDAÇÃO ##
#############################
class JogoForm(forms.ModelForm):
    class Meta:
        model = Jogo
        fields = '__all__'

    def clean(self):
        cleaned_data = super().clean()
        equipa_a = cleaned_data.get('equipa_a')
        equipa_b = cleaned_data.get('equipa_b')
        if equipa_a and equipa_b:
            intersecao = set(equipa_a) & set(equipa_b)
            if intersecao:
                nomes = ', '.join([j.nome for j in intersecao])
                raise forms.ValidationError(
                    f"Jogadores não podem estar em ambas as equipas: {nomes}"
                )
        return cleaned_data

##########################
# USER ADMIN + CONVITES ##
##########################
class CustomUserCreationForm(UserCreationForm):
    password1 = forms.CharField(label="Password", required=False, widget=forms.PasswordInput)
    password2 = forms.CharField(label="Confirmar password", required=False, widget=forms.PasswordInput)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 or password2:
            if password1 != password2:
                raise forms.ValidationError("As passwords não coincidem.")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        password = self.cleaned_data.get("password1")
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        if commit:
            user.save()
        return user

def enviar_convite(modeladmin, request, queryset):
    for user in queryset:
        if not user.email:
            messages.warning(request, f'O usuário "{user.username}" não tem email definido.')
            continue
        form = PasswordResetForm({'email': user.email})
        if form.is_valid():
            form.save(
                request=request,
                from_email='noreply@quintaseuropeias.com',
                email_template_name='registration/password_reset_email.html',
            )
            messages.success(request, f'Convite enviado para {user.email}.')
        else:
            messages.error(request, f'Erro ao enviar convite para {user.email}.')

enviar_convite.short_description = "Enviar convite para definir password"

class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    actions = [enviar_convite]

    list_display = ('username', 'email', 'is_staff', 'is_superuser', 'is_active')
    list_filter = ('is_staff', 'is_superuser', 'is_active')

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissões', {'fields': ('is_staff', 'is_superuser', 'is_active', 'groups', 'user_permissions')}),
        ('Informações pessoais', {'fields': ('first_name', 'last_name')}),
        ('Datas importantes', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_staff', 'is_superuser'),
        }),
    )

    search_fields = ('username', 'email')
    ordering = ('username',)

admin.site.register(User, UserAdmin)

#############################
# JOGOS, GOLOS, JOGADORES ##
#############################
admin.site.register(Jogador)

class GoloInline(admin.TabularInline):
    model = Golo
    extra = 1
    fields = ('jogador', 'quantidade')

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    form = JogoForm
    list_display = ('data', 'resultado_a', 'resultado_b')
    filter_horizontal = ('equipa_a', 'equipa_b')
    inlines = [GoloInline]

admin.site.register(Golo)
