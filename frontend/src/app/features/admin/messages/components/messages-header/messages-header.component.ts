import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Search, MessageSquare, X, RefreshCw } from 'lucide-angular';

@Component({
  selector: 'app-messages-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
          <span>Mensajes</span>
          <span class="px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-500 text-sm font-semibold">
            {{ totalCount() }}
          </span>
        </h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Gestiona todas las consultas y solicitudes de contacto
        </p>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative flex-1 md:w-72">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <lucide-icon [img]="Search" class="w-4 h-4 text-zinc-400"></lucide-icon>
          </div>
          <input
            type="search"
            [value]="searchTerm()"
            (input)="onSearchInput($event)"
            placeholder="Buscar mensajes..."
            class="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-brand-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
          @if (searchTerm()) {
            <button
              type="button"
              (click)="onClear()"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600"
              aria-label="Limpiar"
            >
              <lucide-icon [img]="X" class="w-4 h-4"></lucide-icon>
            </button>
          }
        </div>

        <button
          type="button"
          (click)="onRefresh()"
          [disabled]="refreshing()"
          class="w-10 h-10 rounded-lg flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Refrescar"
          title="Refrescar"
        >
          <lucide-icon
            [img]="RefreshCw"
            class="w-4 h-4"
            [class.animate-spin]="refreshing()"
          ></lucide-icon>
        </button>
      </div>
    </div>
  `,
})
export class MessagesHeaderComponent {
  totalCount = input<number>(0);
  searchTerm = input<string>('');
  refreshing = input<boolean>(false);

  searchChanged = output<string>();
  refresh       = output<void>();

  Search        = Search;
  MessageSquare = MessageSquare;
  X             = X;
  RefreshCw     = RefreshCw;

  onSearchInput(event: Event): void {
    this.searchChanged.emit((event.target as HTMLInputElement).value);
  }

  onClear(): void {
    this.searchChanged.emit('');
  }

  onRefresh(): void {
    this.refresh.emit();
  }
}
