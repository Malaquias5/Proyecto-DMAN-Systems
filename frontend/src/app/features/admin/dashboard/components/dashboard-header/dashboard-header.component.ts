import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Calendar, LucideAngularModule } from 'lucide-angular';

import { AuthStateService } from '../../../../../core/services/state/auth-state.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          {{ greeting() }}, <span class="text-brand-500">{{ username() }}</span>
          <span class="inline-block animate-pulse">👋</span>
        </h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Aquí tienes el resumen de tu actividad
        </p>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
          <lucide-icon [img]="Calendar" class="w-4 h-4 text-zinc-500"></lucide-icon>
          <span class="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {{ currentDate() }}
          </span>
        </div>

        <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          <span class="text-xs font-semibold text-green-700 dark:text-green-400">
            En vivo
          </span>
        </div>
      </div>
    </div>
  `,
})
export class DashboardHeaderComponent {
  private readonly auth = inject(AuthStateService);

  readonly Calendar = Calendar;

  readonly username = computed(() => this.auth.username() ?? 'admin');

  readonly greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  });

  readonly currentDate = computed(() =>
    new Date().toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  );
}
