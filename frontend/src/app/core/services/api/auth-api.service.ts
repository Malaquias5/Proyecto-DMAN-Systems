import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ENDPOINTS } from '../../constants/api.constants';
import { AuthResponse, LoginRequest, RegisterRequest } from '@core/models';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
	private readonly http = inject(HttpClient);

	login(payload: LoginRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(API_ENDPOINTS.auth.login, payload);
	}

	register(payload: RegisterRequest): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(API_ENDPOINTS.auth.register, payload);
	}
}
