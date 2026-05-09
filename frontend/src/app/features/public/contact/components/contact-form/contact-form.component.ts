import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {
  CheckCircle2,
  LucideAngularModule,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User as UserIcon,
} from 'lucide-angular';

import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { InputComponent } from '../../../../../shared/components/ui/input/input.component';
import { TextareaComponent } from '../../../../../shared/components/ui/textarea/textarea.component';
import { SelectComponent, SelectOption } from '../../../../../shared/components/ui/select/select.component';

import { ContactApiService } from '../../../../../core/services/api/contact-api.service';
import { NotificationService } from '../../../../../core/services/utils/notification.service';
import { ApiError } from '../../../../../core/models/shared/api-error.model';
import { noWhitespaceValidator } from '../../../../../core/validators/no-whitespace.validator';
import { phoneValidator } from '../../../../../core/validators/phone.validator';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    SelectComponent,
  ],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent implements OnInit, OnChanges {
  preselectedService = input<string>('');

  private readonly fb      = inject(FormBuilder);
  private readonly api     = inject(ContactApiService);
  private readonly notify  = inject(NotificationService);

  readonly UserIcon      = UserIcon;
  readonly Mail          = Mail;
  readonly Phone         = Phone;
  readonly Send          = Send;
  readonly MessageSquare = MessageSquare;
  readonly CheckCircle2  = CheckCircle2;

  readonly loading   = signal(false);
  readonly submitted = signal(false);

  readonly serviceOptions: SelectOption[] = [
    { value: 'web',    label: 'Página web' },
    { value: 'app',    label: 'Aplicación móvil' },
    { value: 'ventas', label: 'Sistema de ventas / POS' },
    { value: 'bot',    label: 'Bot automatizado' },
    { value: 'otro',   label: 'Otro / No estoy seguro' },
  ];

  form = this.fb.nonNullable.group({
    nombre:   ['', [Validators.required, Validators.minLength(2), noWhitespaceValidator()]],
    email:    ['', [Validators.required, Validators.email]],
    telefono: ['', [phoneValidator()]],
    asunto:   [''],
    servicio: [''],
    mensaje:  ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500), noWhitespaceValidator()]],
  });

  ngOnInit(): void {
    this.applyPreselectedService();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preselectedService']) {
      this.applyPreselectedService();
    }
  }

  private applyPreselectedService(): void {
    const servicio = this.preselectedService();
    if (servicio && this.serviceOptions.some(o => o.value === servicio)) {
      this.form.patchValue({ servicio });
    }
  }

  getError(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.touched) return '';

    if (control.hasError('required'))    return 'Este campo es obligatorio';
    if (control.hasError('email'))        return 'Email inválido';
    if (control.hasError('whitespace'))   return 'No puede estar vacío';
    if (control.hasError('invalidPhone')) return 'Teléfono inválido (ej: 987654321)';

    if (control.hasError('minlength')) {
      const min = control.errors?.['minlength']?.requiredLength;
      return `Mínimo ${min} caracteres`;
    }
    if (control.hasError('maxlength')) {
      const max = control.errors?.['maxlength']?.requiredLength;
      return `Máximo ${max} caracteres`;
    }

    return '';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.warning('Formulario incompleto', 'Por favor revisa los campos marcados en rojo');
      return;
    }

    const value = this.form.getRawValue();

    const asuntoBase = value.servicio
      ? (this.serviceOptions.find(o => o.value === value.servicio)?.label ?? '')
      : '';
    const asuntoFinal = value.asunto
      ? (asuntoBase ? `${asuntoBase} · ${value.asunto}` : value.asunto)
      : asuntoBase;

    this.loading.set(true);

    this.api.send({
      nombre:   value.nombre.trim(),
      email:    value.email.trim(),
      telefono: value.telefono?.trim() || undefined,
      asunto:   asuntoFinal || undefined,
      mensaje:  value.mensaje.trim(),
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.submitted.set(true);
        this.notify.success('¡Mensaje enviado!', 'Te contactaremos en menos de 24 horas');
        this.form.reset();
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
      this.notify.error('Sin conexión', 'No pudimos conectar con el servidor. Verifica tu internet.');
      return;
    }

    if (error.status === 400 && apiError?.errors) {
      const firstError = Object.values(apiError.errors)[0];
      this.notify.error('Datos inválidos', firstError);
      return;
    }

    this.notify.error(
      'No pudimos enviar tu mensaje',
      apiError?.message ?? 'Intenta nuevamente o contáctanos por WhatsApp'
    );
  }

  resetSubmitted(): void {
    this.submitted.set(false);
  }
}
