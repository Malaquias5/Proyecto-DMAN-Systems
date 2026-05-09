import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { MessageStatus } from '../../../../core/enums';
import { AdminApiService } from '../../../../core/services/api/admin-api.service';
import { AuthStateService } from '../../../../core/services/state/auth-state.service';

@Component({
	selector: 'app-admin-sidebar',
	standalone: true,
	imports: [CommonModule, RouterLink, RouterLinkActive],
	template: `
		<aside class="h-full flex flex-col border-r border-zinc-800 bg-zinc-950 text-zinc-100">
			<div class="px-5 py-6 border-b border-zinc-800">
				<div class="flex items-center gap-3">
					<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-cyan-400 text-white flex items-center justify-center font-black">D</div>
					<div>
						<p class="font-black text-lg leading-none">DMAN Admin</p>
						<p class="text-xs uppercase tracking-wider text-zinc-500">Panel interno</p>
					</div>
				</div>
			</div>

			<nav class="px-4 py-5 space-y-2">
				<a routerLink="/admin/dashboard" routerLinkActive="bg-brand-500/15 text-brand-300 border-brand-500/40" class="flex items-center gap-3 px-3 py-3 rounded-xl border border-transparent text-zinc-300 hover:bg-zinc-900">
					<span>⌘</span><span>Dashboard</span>
				</a>
				<a routerLink="/admin/clientes" routerLinkActive="bg-brand-500/15 text-brand-300 border-brand-500/40" class="flex items-center gap-3 px-3 py-3 rounded-xl border border-transparent text-zinc-300 hover:bg-zinc-900">
					<span>◌</span><span>Clientes</span>
				</a>
				<a routerLink="/admin/mensajes" routerLinkActive="bg-brand-500/15 text-brand-300 border-brand-500/40" class="flex items-center justify-between px-3 py-3 rounded-xl border border-transparent text-zinc-300 hover:bg-zinc-900">
					<span class="flex items-center gap-3"><span>◫</span><span>Mensajes</span></span>
					@if (pendingCount() > 0) {
						<span class="h-6 min-w-6 px-1 rounded-full bg-amber-500 text-black text-xs font-bold flex items-center justify-center">{{ pendingCount() }}</span>
					}
				</a>
			</nav>

			<div class="mt-auto px-4 py-5 border-t border-zinc-800">
				<div class="rounded-xl bg-zinc-900 p-3 flex items-center gap-3 mb-3">
					<div class="w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center">{{ initials() }}</div>
					<div>
						<p class="font-semibold leading-none">{{ username() }}</p>
						<p class="text-xs text-zinc-500">Administrador</p>
					</div>
				</div>
				<button type="button" (click)="logout()" class="w-full px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold">Cerrar sesión</button>
			</div>
		</aside>
	`,
})
export class AdminSidebarComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly adminApi = inject(AdminApiService);
	private readonly auth = inject(AuthStateService);
	private readonly router = inject(Router);

	readonly pendingCount = signal(0);
	readonly username = computed(() => this.auth.username() ?? 'admin');
	readonly initials = computed(() => this.username().slice(0, 2).toUpperCase());

	constructor() {
		this.adminApi
			.getMessages()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((messages) => this.pendingCount.set(messages.filter((m) => m.estado === MessageStatus.PENDIENTE).length));
	}

	logout(): void {
		this.auth.logout(false);
		this.router.navigateByUrl('/login');
	}
}
