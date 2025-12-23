from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import SetPasswordForm
from django.contrib.auth.models import User
from django.utils.http import urlsafe_base64_decode
from django.shortcuts import render, redirect, get_object_or_404

def definir_password(request, uidb64, token):
    uid = urlsafe_base64_decode(uidb64).decode()
    user = get_object_or_404(User, pk=uid)

    if not default_token_generator.check_token(user, token):
        return render(request, 'registration/password_invalid.html')

    if request.method == 'POST':
        form = SetPasswordForm(user, request.POST)
        if form.is_valid():
            form.save()
            if not user.is_active:
                user.is_active = True
                user.save()
            return redirect('login')  # ou qualquer outra página
    else:
        form = SetPasswordForm(user)

    return render(request, 'registration/definir_password.html', {'form': form})
