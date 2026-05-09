import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStateService, NotificationService } from '@core/services';

export const authGuard: CanActivateFn = (_route, state) => {
	const auth = inject(AuthStateService);
	const router = inject(Router);
	const notify = inject(NotificationService);

	if (auth.isAuthenticated()) {
		return true;
	}

	notify.warning('Acceso restringido', 'Debes iniciar sesión para acceder a esta sección');
	router.navigate(['/login'], {
		queryParams: { returnUrl: state.url },
	});

	return false;
};
