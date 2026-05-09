import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import {
  Bot,
  Globe,
  LayoutGrid,
  LucideAngularModule,
  Smartphone,
  ShoppingCart,
} from 'lucide-angular';

export type ServiceFilter = 'all' | 'web' | 'app' | 'ventas' | 'bot';

interface FilterOption {
  value: ServiceFilter;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  count?: number;
}

@Component({
  selector: 'app-services-filter',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
      @for (filter of filters(); track filter.value) {
        <button
          type="button"
          (click)="onSelect(filter.value)"
          [class]="getButtonClasses(filter.value)"
        >
          <lucide-icon [img]="filter.icon" class="w-4 h-4"></lucide-icon>
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
export class ServicesFilterComponent {
  selected = input<ServiceFilter>('all');
  counts = input<Record<ServiceFilter, number>>({
    all: 0, web: 0, app: 0, ventas: 0, bot: 0,
  });

  changed = output<ServiceFilter>();

  filters = computed<FilterOption[]>(() => {
    const c = this.counts();
    return [
      { value: 'all',    label: 'Todos',        icon: LayoutGrid,   count: c.all    },
      { value: 'web',    label: 'Web',          icon: Globe,        count: c.web    },
      { value: 'app',    label: 'Apps móviles', icon: Smartphone,   count: c.app    },
      { value: 'ventas', label: 'Sistemas',     icon: ShoppingCart, count: c.ventas },
      { value: 'bot',    label: 'Bots',         icon: Bot,          count: c.bot    },
    ];
  });

  onSelect(filter: ServiceFilter): void {
    this.changed.emit(filter);
  }

  getButtonClasses(filter: ServiceFilter): string {
    const base = 'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97]';
    const active = 'bg-brand-500 text-white shadow-md shadow-brand-500/25';
    const inactive = 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700';
    return `${base} ${this.selected() === filter ? active : inactive}`;
  }

  getCountClasses(filter: ServiceFilter): string {
    const base = 'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold';
    const active = 'bg-white/20 text-white';
    const inactive = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400';
    return `${base} ${this.selected() === filter ? active : inactive}`;
  }
}
