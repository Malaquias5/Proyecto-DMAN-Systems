import { Injectable, effect, signal } from '@angular/core';

import { STORAGE_KEYS } from '@core/constants/storage-keys';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeStateService {
	private readonly _theme = signal<Theme>(this.loadInitialTheme());

	readonly theme = this._theme.asReadonly();
	readonly isDark = (): boolean => this._theme() === 'dark';

	constructor() {
		effect(() => {
			const theme = this._theme();
			const root = document.documentElement;

			if (theme === 'dark') {
				root.classList.add('dark');
				root.classList.remove('light');
			} else {
				root.classList.add('light');
				root.classList.remove('dark');
			}

			localStorage.setItem(STORAGE_KEYS.THEME, theme);
		});
	}

	toggle(): void {
		this._theme.update((theme) => (theme === 'dark' ? 'light' : 'dark'));
	}

	setTheme(theme: Theme): void {
		this._theme.set(theme);
	}

	private loadInitialTheme(): Theme {
		const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
		if (savedTheme === 'light' || savedTheme === 'dark') {
			return savedTheme;
		}

		const prefersDark = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
		return prefersDark ? 'dark' : 'light';
	}
}
