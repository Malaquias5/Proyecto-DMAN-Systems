import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStateService } from '@core/services';

export const guestGuard: CanActivateFn = () => {
	const auth = inject(AuthStateService);
	const router = inject(Router);

	if (!auth.isAuthenticated()) {
		return true;
	}

	router.navigate(['/admin/dashboard']);
	return false;
};
