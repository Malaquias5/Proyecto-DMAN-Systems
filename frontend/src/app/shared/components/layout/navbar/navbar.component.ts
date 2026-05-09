import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ThemeToggleComponent } from '../../widgets/theme-toggle/theme-toggle.component';
import { AuthStateService } from '../../../../core/services/state/auth-state.service';
import { NotificationService } from '../../../../core/services/utils/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ThemeToggleComponent],
  template: `
    <header class="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div class="container-custom h-20 flex items-center justify-between gap-4">
        <a routerLink="/" class="flex items-center gap-3 group" (click)="closeMobileMenu()">
          <div
            class="relative w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110"
            style="background: linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%); box-shadow: 0 0 24px rgba(99,102,241,0.5), 0 0 48px rgba(139,92,246,0.2);"
          >
            <span
              class="relative z-10 text-white font-black text-xl"
              style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
            >D</span>
            <div
              class="absolute inset-0 opacity-30"
              style="background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%);"
            ></div>
          </div>
          <div>
            <p class="font-extrabold tracking-tight leading-none text-zinc-900 dark:text-zinc-100">DMAN Systems</p>
            <p class="text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">Soluciones TI</p>
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-2 rounded-xl border border-zinc-200 bg-white/70 p-1 dark:border-zinc-800 dark:bg-zinc-900/70">
          @for (item of links; track item.path) {
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-brand-500 text-white shadow"
              [routerLinkActiveOptions]="item.path === '/' ? exactOptions : nonExactOptions"
              class="px-4 py-2 rounded-lg text-sm font-semibold text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            >
              {{ item.label }}
            </a>
          }
        </nav>

        <div class="hidden md:flex items-center gap-2">
          <app-theme-toggle />

          @if (isAuthenticated()) {
            <button
              type="button"
              (click)="goToAdmin()"
              class="px-4 py-2 rounded-lg text-sm font-semibold border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
            >
              Admin
            </button>
            <button
              type="button"
              (click)="logout()"
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Salir
            </button>
          } @else {
            <a
              routerLink="/contacto"
              class="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); box-shadow: 0 0 16px rgba(99,102,241,0.3);"
            >
              Cotizar ahora
            </a>
          }
        </div>

        <button
          type="button"
          class="md:hidden w-10 h-10 rounded-lg border border-zinc-200 flex items-center justify-center dark:border-zinc-800"
          (click)="toggleMobileMenu()"
          [attr.aria-label]="mobileOpen() ? 'Cerrar menú' : 'Abrir menú'"
        >
          <span class="text-xl">{{ mobileOpen() ? '✕' : '☰' }}</span>
        </button>
      </div>

      @if (mobileOpen()) {
        <div class="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95">
          <div class="container-custom py-4 flex flex-col gap-2">
            @for (item of links; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-brand-500 text-white"
                [routerLinkActiveOptions]="item.path === '/' ? exactOptions : nonExactOptions"
                (click)="closeMobileMenu()"
                class="px-4 py-3 rounded-lg font-semibold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                {{ item.label }}
              </a>
            }

            <div class="pt-3 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <app-theme-toggle />
              @if (isAuthenticated()) {
                <button type="button" (click)="logout(); closeMobileMenu()" class="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-semibold dark:bg-zinc-100 dark:text-zinc-900">Salir</button>
              } @else {
                <a
                  routerLink="/contacto"
                  (click)="closeMobileMenu()"
                  class="px-4 py-2 rounded-lg text-white text-sm font-semibold"
                  style="background: linear-gradient(135deg, #3B82F6, #8B5CF6);"
                >
                  Cotizar ahora
                </a>
              }
            </div>
          </div>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  private readonly auth = inject(AuthStateService);
  private readonly notify = inject(NotificationService);
  private readonly router = inject(Router);

  readonly mobileOpen = signal(false);
  readonly isAuthenticated = computed(() => this.auth.isAuthenticated());

  readonly links = [
    { label: 'Inicio', path: '/' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Contacto', path: '/contacto' },
  ];

  readonly exactOptions = { exact: true };
  readonly nonExactOptions = { exact: false };

  toggleMobileMenu(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileOpen.set(false);
  }

  goToAdmin(): void {
    this.router.navigateByUrl('/admin/dashboard');
  }

  logout(): void {
    this.auth.logout(false);
    this.notify.info('Sesión cerrada');
    this.router.navigateByUrl('/');
  }
}