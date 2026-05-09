import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { ApiError } from '@core/models';
import { AuthStateService, NotificationService } from '@core/services';

interface ErrorContext {
	auth: AuthStateService;
	router: Router;
	notificationService: NotificationService;
	skipToast: boolean;
}

function notifyIfAllowed(context: ErrorContext, type: 'error' | 'warning' | 'info' | 'success', title: string, message?: string): void {
	if (context.skipToast) {
		return;
	}

	context.notificationService[type](title, message);
}

function handleUnauthorized(context: ErrorContext): void {
	if (context.auth.isAuthenticated()) {
		context.notificationService.warning('Sesion expirada', 'Por favor inicia sesión nuevamente');
		context.auth.logout(false);
	}

	context.router.navigate(['/login']);
}

function handleBadRequest(context: ErrorContext, apiError: ApiError | null): void {
	const fieldErrors = apiError?.errors;
	if (fieldErrors) {
		const firstError = Object.values(fieldErrors)[0];
		notifyIfAllowed(context, 'error', 'Error de validación', firstError);
		return;
	}

	notifyIfAllowed(context, 'error', 'Petición incorrecta', apiError?.message ?? 'Verifica los datos enviados');
}

function handleHttpError(error: HttpErrorResponse, apiError: ApiError | null, context: ErrorContext): void {
	switch (error.status) {
		case 401:
			handleUnauthorized(context);
			return;
		case 403:
			notifyIfAllowed(context, 'error', 'Acceso denegado', 'No tienes permisos para realizar esta acción');
			return;
		case 404:
			notifyIfAllowed(context, 'warning', 'No encontrado', apiError?.message ?? 'El recurso solicitado no existe');
			return;
		case 400:
			handleBadRequest(context, apiError);
			return;
		case 0:
			context.notificationService.error('Sin conexión', 'No pudimos conectar con el servidor. Verifica tu internet.');
			return;
		default:
			if (error.status >= 500) {
				notifyIfAllowed(context, 'error', 'Error del servidor', 'Algo salió mal. Intenta nuevamente en unos momentos.');
				return;
			}

			notifyIfAllowed(context, 'error', 'Error', apiError?.message ?? error.message ?? 'Algo salió mal');
	}
}

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
	const auth = inject(AuthStateService);
	const router = inject(Router);
	const notificationService = inject(NotificationService);

	const skipToast = request.headers.has('X-Skip-Error-Toast');
	const cleanRequest = skipToast
		? request.clone({ headers: request.headers.delete('X-Skip-Error-Toast') })
		: request;

	const context: ErrorContext = {
		auth,
		router,
		notificationService,
		skipToast,
	};

	return next(cleanRequest).pipe(
		catchError((error: unknown) => {
			if (error instanceof HttpErrorResponse) {
				const apiError = (error.error ?? null) as ApiError | null;
				handleHttpError(error, apiError, context);
			} else {
				notifyIfAllowed(context, 'error', 'Error inesperado en la aplicación.');
			}

			return throwError(() => error);
		})
	);
};
