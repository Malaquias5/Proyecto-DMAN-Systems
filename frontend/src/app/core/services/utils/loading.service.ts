import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
	private readonly pendingRequests = signal(0);

	readonly isLoading = computed(() => this.pendingRequests() > 0);
	readonly activeCount = this.pendingRequests.asReadonly();

	show(): void {
		this.pendingRequests.update((value) => value + 1);
	}

	hide(): void {
		this.pendingRequests.update((value) => Math.max(0, value - 1));
	}

	reset(): void {
		this.pendingRequests.set(0);
	}

	// Compatibilidad con llamadas existentes
	start(): void {
		this.show();
	}

	stop(): void {
		this.hide();
	}
}
