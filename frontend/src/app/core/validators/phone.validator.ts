import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida numeros de telefono peruanos.
 */
export function phoneValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (!value) {
			return null;
		}

		const cleaned = String(value).replaceAll(/[\s\-()]/g, '');
		const pattern = /^(\+51)?\d{7,9}$/;

		return pattern.test(cleaned) ? null : { invalidPhone: { value: control.value } };
	};
}
