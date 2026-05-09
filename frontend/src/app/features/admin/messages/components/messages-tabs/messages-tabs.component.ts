import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule, Inbox, Clock, CircleCheck } from 'lucide-angular';

export type MessageTab = 'all' | 'pendiente' | 'atendido';

interface TabOption {
  value: MessageTab;
  label: string;
  icon: any;
  count: number;
  dotColor?: string;
}

@Component({
  selector: 'app-messages-tabs',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      class="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 mb-5"
      role="tablist"
    >
      @for (tab of tabs(); track tab.value) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="selected() === tab.value"
          (click)="onSelect(tab.value)"
          [class]="getButtonClasses(tab.value)"
        >
          @if (tab.dotColor) {
            <span [class]="'w-1.5 h-1.5 rounded-full ' + tab.dotColor"></span>
          } @else {
            <lucide-icon [img]="tab.icon" class="w-3.5 h-3.5"></lucide-icon>
          }
          <span>{{ tab.label }}</span>
          <span [class]="getCountClasses(tab.value)">
            {{ tab.count }}
          </span>
        </button>
      }
    </div>
  `,
})
export class MessagesTabsComponent {
  selected = input<MessageTab>('all');
  counts   = input<Record<MessageTab, number>>({
    all: 0, pendiente: 0, atendido: 0,
  });

  changed = output<MessageTab>();

  tabs = computed<TabOption[]>(() => {
    const c = this.counts();
    return [
      { value: 'all',       label: 'Todos',      icon: Inbox,        count: c.all                              },
      { value: 'pendiente', label: 'Pendientes', icon: Clock,        count: c.pendiente, dotColor: 'bg-yellow-500' },
      { value: 'atendido',  label: 'Atendidos',  icon: CircleCheck,  count: c.atendido,  dotColor: 'bg-green-500'  },
    ];
  });

  onSelect(tab: MessageTab): void {
    this.changed.emit(tab);
  }

  getButtonClasses(tab: MessageTab): string {
    const base     = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200';
    const active   = 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm';
    const inactive = 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100';
    return `${base} ${this.selected() === tab ? active : inactive}`;
  }

  getCountClasses(tab: MessageTab): string {
    const base     = 'inline-flex items-center justify-center min-w-[20px] h-[18px] px-1.5 rounded text-[10px] font-bold';
    const active   = 'bg-brand-500 text-white';
    const inactive = 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    return `${base} ${this.selected() === tab ? active : inactive}`;
  }
}
