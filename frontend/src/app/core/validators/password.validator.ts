import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida que el password cumpla minimos de seguridad.
 */
export function strongPasswordValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value = control.value;
		if (!value) {
			return null;
		}

		const hasMinLength = String(value).length >= 6;
		const hasLetter = /[a-zA-Z]/.test(String(value));
		const hasNumber = /\d/.test(String(value));

		const errors: ValidationErrors = {};
		if (!hasMinLength) {
			errors['minLengthError'] = true;
		}
		if (!hasLetter) {
			errors['noLetterError'] = true;
		}
		if (!hasNumber) {
			errors['noNumberError'] = true;
		}

		return Object.keys(errors).length ? { weakPassword: errors } : null;
	};
}

/**
 * Valida que dos campos coincidan.
 */
export function matchFieldsValidator(field1: string, field2: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const value1 = control.get(field1)?.value;
		const value2 = control.get(field2)?.value;

		if (value1 !== value2) {
			control.get(field2)?.setErrors({ fieldsMismatch: true });
			return { fieldsMismatch: true };
		}

		return null;
	};
}
