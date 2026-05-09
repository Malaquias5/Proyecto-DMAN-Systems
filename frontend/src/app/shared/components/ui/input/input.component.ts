import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

export type InputType = 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly controlId = `app-input-${Math.random().toString(36).slice(2, 9)}`;

  label = input<string>('');
  placeholder = input<string>('');
  type = input<InputType>('text');
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  hint = input<string>('');
  errorMsg = input<string>('');
  iconLeft = input<any>(null);
  autocomplete = input<string>('');

  value = signal<string>('');
  focused = signal(false);
  showPassword = signal(false);
  isDisabled = signal(false);

  disabledState = computed(() => this.disabled() || this.isDisabled());

  hasError = computed(() => !!this.errorMsg());

  inputType = computed(() => {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  });

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  onBlur(): void {
    this.focused.set(false);
    this.onTouched();
  }

  onFocus(): void {
    this.focused.set(true);
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }
}