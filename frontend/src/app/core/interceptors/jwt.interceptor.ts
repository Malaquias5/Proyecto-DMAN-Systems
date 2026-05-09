import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthStateService } from '@core/services';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthStateService);
  const token = auth.getToken();

	const isAuthEndpoint =
		request.url.includes('/auth/login') ||
		request.url.includes('/auth/register');

	if (!token || isAuthEndpoint) {
		return next(request);
	}

	return next(
		request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		})
	);
};
