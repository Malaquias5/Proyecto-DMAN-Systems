import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoadingService } from '../services/utils/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (request, next) => {
	const loadingService = inject(LoadingService);

	const skipLoading = request.headers.has('X-Skip-Loading');
	const cleanRequest = skipLoading
		? request.clone({ headers: request.headers.delete('X-Skip-Loading') })
		: request;

	if (!skipLoading) {
		loadingService.show();
	}

	return next(cleanRequest).pipe(
		finalize(() => {
			if (!skipLoading) {
				loadingService.hide();
			}
		}),
	);
};
