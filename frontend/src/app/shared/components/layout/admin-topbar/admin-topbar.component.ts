import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { ThemeToggleComponent } from '../../widgets/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-admin-topbar',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  template: `
    <header class="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between gap-4">
      <div>
        <h1 class="text-lg md:text-xl font-black text-zinc-100">{{ title() }}</h1>
      </div>

      <div class="flex items-center gap-2 md:gap-3">
        <div class="hidden md:flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-400 min-w-[220px]">
          <span>⌕</span>
          <input type="text" placeholder="Buscar..." class="bg-transparent outline-none w-full text-zinc-200 placeholder:text-zinc-500" />
        </div>

        <button type="button" class="w-10 h-10 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300">◉</button>
        <app-theme-toggle />
      </div>
    </header>
  `,
})
export class AdminTopbarComponent {
  private readonly router = inject(Router);

  readonly title = computed(() => {
    const url = this.router.url;
    if (url.includes('/admin/mensajes')) {
      return 'Mensajes';
    }
    if (url.includes('/admin/clientes')) {
      return 'Clientes';
    }
    return 'Dashboard';
  });

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        startWith(null),
        map(() => this.router.url),
      )
      .subscribe();
  }
}