import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { STORAGE_KEYS } from '@core/constants/storage-keys';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@core/models';
import { AuthApiService } from '../api/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
	private readonly authApi = inject(AuthApiService);
	private readonly router = inject(Router);

	private readonly _user = signal<User | null>(this.loadUserFromStorage());
	private readonly _token = signal<string | null>(this.loadTokenFromStorage());

	readonly user = this._user.asReadonly();
	readonly token = this._token.asReadonly();
	readonly isAuthenticated = computed(() => this._token() !== null);
	readonly username = computed(() => this._user()?.username ?? null);
	readonly role = computed(() => this._user()?.role ?? null);
	readonly isAdmin = computed(() => this._user()?.role === 'ADMIN');

	login(request: LoginRequest): Observable<AuthResponse> {
		return this.authApi.login(request).pipe(tap((res) => this.handleAuthSuccess(res)));
	}

	register(request: RegisterRequest): Observable<AuthResponse> {
		return this.authApi.register(request).pipe(tap((res) => this.handleAuthSuccess(res)));
	}

	logout(redirectToLogin = true): void {
		localStorage.removeItem(STORAGE_KEYS.TOKEN);
		localStorage.removeItem(STORAGE_KEYS.USER);
		this._token.set(null);
		this._user.set(null);
		if (redirectToLogin) {
			this.router.navigate(['/login']);
		}
	}

	getToken(): string | null {
		return this._token();
	}

	private handleAuthSuccess(res: AuthResponse): void {
		const user: User = { username: res.username, role: res.role };
		localStorage.setItem(STORAGE_KEYS.TOKEN, res.token);
		localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
		this._token.set(res.token);
		this._user.set(user);
	}

	private loadUserFromStorage(): User | null {
		try {
			const raw = localStorage.getItem(STORAGE_KEYS.USER);
			return raw ? (JSON.parse(raw) as User) : null;
		} catch {
			return null;
		}
	}

	private loadTokenFromStorage(): string | null {
		return localStorage.getItem(STORAGE_KEYS.TOKEN);
	}
}
