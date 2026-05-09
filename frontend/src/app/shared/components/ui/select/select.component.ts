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

export interface SelectOption {
  value: string | number;
  label: string;
}

type SelectValue = string | number | null;

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  readonly controlId = `app-select-${Math.random().toString(36).slice(2, 9)}`;

  label = input<string>('');
  placeholder = input<string>('Selecciona una opción');
  options = input<readonly SelectOption[]>([]);
  required = input<boolean>(false);
  disabled = input<boolean>(false);
  errorMsg = input<string>('');

  value = signal<SelectValue>(null);
  isDisabled = signal(false);

  hasError = computed(() => !!this.errorMsg());

  disabledState = computed(() => this.disabled() || this.isDisabled());

  private onChange: (v: SelectValue) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: SelectValue): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (v: SelectValue) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onChangeSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.value.set(value);
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }
}