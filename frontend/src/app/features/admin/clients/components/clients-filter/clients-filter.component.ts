import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import {
  LucideAngularModule,
  LayoutGrid,
  Globe,
  Smartphone,
  ShoppingCart,
  Bot,
  Ellipsis,
} from 'lucide-angular';

export type ClientServiceFilter = 'all' | 'web' | 'app' | 'ventas' | 'bot' | 'otro';

interface FilterOption {
  value: ClientServiceFilter;
  label: string;
  icon: any;
  count?: number;
}

@Component({
  selector: 'app-clients-filter',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-wrap gap-2 mb-5">
      @for (filter of filters(); track filter.value) {
        <button
          type="button"
          (click)="onSelect(filter.value)"
          [class]="getButtonClasses(filter.value)"
        >
          <lucide-icon [img]="filter.icon" class="w-3.5 h-3.5"></lucide-icon>
          <span>{{ filter.label }}</span>
          @if (filter.count !== undefined) {
            <span [class]="getCountClasses(filter.value)">
              {{ filter.count }}
            </span>
          }
        </button>
      }
    </div>
  `,
})
export class ClientsFilterComponent {
  selected = input<ClientServiceFilter>('all');
  counts   = input<Record<ClientServiceFilter, number>>({
    all: 0, web: 0, app: 0, ventas: 0, bot: 0, otro: 0,
  });

  changed = output<ClientServiceFilter>();

  filters = computed<FilterOption[]>(() => {
    const c = this.counts();
    return [
      { value: 'all',    label: 'Todos',  icon: LayoutGrid,   count: c.all    },
      { value: 'web',    label: 'Web',    icon: Globe,        count: c.web    },
      { value: 'app',    label: 'Apps',   icon: Smartphone,   count: c.app    },
      { value: 'ventas', label: 'Ventas', icon: ShoppingCart, count: c.ventas },
      { value: 'bot',    label: 'Bots',   icon: Bot,          count: c.bot    },
      { value: 'otro',   label: 'Otro',   icon: Ellipsis,     count: c.otro   },
    ];
  });

  onSelect(filter: ClientServiceFilter): void {
    this.changed.emit(filter);
  }

  getButtonClasses(filter: ClientServiceFilter): string {
    const base     = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-[0.97]';
    const active   = 'bg-brand-500 text-white';
    const inactive = 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700';
    return `${base} ${this.selected() === filter ? active : inactive}`;
  }

  getCountClasses(filter: ClientServiceFilter): string {
    const base     = 'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded text-[10px] font-bold';
    const active   = 'bg-white/20 text-white';
    const inactive = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400';
    return `${base} ${this.selected() === filter ? active : inactive}`;
  }
}
