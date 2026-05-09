import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStateService, NotificationService } from '@core/services';

export function roleGuard(allowedRoles: string[]): CanActivateFn {
	return () => {
		const auth = inject(AuthStateService);
		const router = inject(Router);
		const notify = inject(NotificationService);

		if (!auth.isAuthenticated()) {
			router.navigate(['/login']);
			return false;
		}

		const userRole = auth.role();
		if (userRole && allowedRoles.includes(userRole)) {
			return true;
		}

		notify.error('Acceso denegado', 'No tienes permisos para acceder a esta sección');
		router.navigate(['/']);
		return false;
	};
}
