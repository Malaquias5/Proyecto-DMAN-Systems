import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArrowLeft, ArrowRight, Lock, LucideAngularModule, Shield, User as UserIcon } from 'lucide-angular';

import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { InputComponent } from '../../../shared/components/ui/input/input.component';

import { ApiError } from '../../../core/models';
import { AuthStateService, NotificationService } from '../../../core/services';

@Component({
selector: 'app-login',
standalone: true,
changeDetection: ChangeDetectionStrategy.OnPush,
imports: [
CommonModule,
ReactiveFormsModule,
RouterLink,
LucideAngularModule,
ButtonComponent,
InputComponent,
CardComponent,
],
templateUrl: './login.component.html',
})
export class LoginComponent {
private readonly fb = inject(FormBuilder);
private readonly router = inject(Router);
private readonly route = inject(ActivatedRoute);
private readonly authState = inject(AuthStateService);
readonly notify = inject(NotificationService);

readonly ArrowRight = ArrowRight;
readonly ArrowLeft = ArrowLeft;
readonly Lock = Lock;
readonly UserIcon = UserIcon;
readonly Shield = Shield;

readonly loading = signal(false);
readonly errorMessage = signal<string | null>(null);
readonly year = new Date().getFullYear();

readonly form = this.fb.group({
username: ['', [Validators.required, Validators.minLength(3)]],
password: ['', [Validators.required, Validators.minLength(6)]],
rememberMe: [true],
});

get usernameError(): string {
const ctrl = this.form.get('username');
if (!ctrl?.touched) return '';
if (ctrl.hasError('required')) return 'El usuario es obligatorio';
if (ctrl.hasError('minlength')) return 'Mínimo 3 caracteres';
return '';
}

get passwordError(): string {
const ctrl = this.form.get('password');
if (!ctrl?.touched) return '';
if (ctrl.hasError('required')) return 'La contraseña es obligatoria';
if (ctrl.hasError('minlength')) return 'Mínimo 6 caracteres';
return '';
}

onSubmit(): void {
this.errorMessage.set(null);

if (this.form.invalid) {
this.form.markAllAsTouched();
this.notify.warning('Formulario incompleto', 'Verifica los campos');
return;
}

const { username, password } = this.form.getRawValue();
if (!username || !password) return;

this.loading.set(true);

this.authState.login({ username, password }).subscribe({
next: (response) => {
this.loading.set(false);
this.notify.success(`¡Hola, ${response.username}!`, 'Has iniciado sesión correctamente');
const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/admin/dashboard';
this.router.navigateByUrl(returnUrl);
},
error: (error: HttpErrorResponse) => {
this.loading.set(false);
this.handleError(error);
},
});
}

private handleError(error: HttpErrorResponse): void {
const apiError = error.error as ApiError | null;

if (error.status === 0) {
this.errorMessage.set('No pudimos conectar con el servidor. Verifica tu internet.');
return;
}
if (error.status === 401 || error.status === 403) {
this.errorMessage.set('Usuario o contraseña incorrectos');
return;
}
if (error.status === 400) {
this.errorMessage.set(apiError?.message ?? 'Datos inválidos. Verifica los campos.');
return;
}
if (error.status >= 500) {
this.errorMessage.set('Error del servidor. Intenta nuevamente en unos momentos.');
return;
}
this.errorMessage.set(apiError?.message ?? 'No pudimos iniciar sesión. Intenta de nuevo.');
}
}
