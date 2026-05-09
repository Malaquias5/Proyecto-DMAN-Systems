import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
	id: number;
	type: ToastType;
	title: string;
	message?: string;
	duration?: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
	private readonly queue = signal<Toast[]>([]);
	private nextId = 1;

	readonly toasts = this.queue.asReadonly();

	success(title: string, message?: string, duration = 4000): void {
		this.show({ type: 'success', title, message, duration });
	}

	error(title: string, message?: string, duration = 5000): void {
		this.show({ type: 'error', title, message, duration });
	}

	warning(title: string, message?: string, duration = 4500): void {
		this.show({ type: 'warning', title, message, duration });
	}

	info(title: string, message?: string, duration = 4000): void {
		this.show({ type: 'info', title, message, duration });
	}

	dismiss(id: number): void {
		this.queue.update((items) => items.filter((item) => item.id !== id));
	}

	dismissAll(): void {
		this.queue.set([]);
	}

	// Compatibilidad con nombre antiguo
	remove(id: number): void {
		this.dismiss(id);
	}

	private show(opts: Omit<Toast, 'id'>): void {
		const toast: Toast = { id: this.nextId++, ...opts };
		this.queue.update((items) => [...items, toast]);

		if (opts.duration && opts.duration > 0) {
			setTimeout(() => {
				this.dismiss(toast.id);
			}, opts.duration);
		}
	}
}
