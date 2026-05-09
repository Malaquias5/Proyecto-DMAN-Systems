import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import {
  Info,
  LucideAngularModule,
  X,
} from 'lucide-angular';

import { Toast } from '@core/services/utils/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      [class]="containerClasses()"
      role="alert"
    >
      <div [class]="iconWrapperClasses()">
        <lucide-icon [img]="iconForType()" class="w-5 h-5"></lucide-icon>
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {{ toast().title }}
        </p>
        @if (toast().message) {
          <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
            {{ toast().message }}
          </p>
        }
      </div>

      <button
        (click)="dismiss.emit(toast().id)"
        class="flex-shrink-0 p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Cerrar"
      >
        <lucide-icon [img]="X" class="w-4 h-4 text-zinc-500"></lucide-icon>
      </button>
    </div>
  `,
})
export class ToastComponent {
  toast = input.required<Toast>();
  dismiss = output<number>();

  Info = Info;
  X = X;

  iconForType = computed(() => {
    const map = {
      success: Info,
      error: Info,
      warning: Info,
      info: Info,
    };
    return map[this.toast().type];
  });

  containerClasses = computed(() => {
    const base =
      'flex items-start gap-3 p-4 rounded-xl shadow-lg backdrop-blur-xl border min-w-[320px] max-w-md animate-fade-in-down';
    const variants = {
      success: 'bg-white/90 dark:bg-zinc-900/90 border-green-500/20',
      error: 'bg-white/90 dark:bg-zinc-900/90 border-red-500/20',
      warning: 'bg-white/90 dark:bg-zinc-900/90 border-yellow-500/20',
      info: 'bg-white/90 dark:bg-zinc-900/90 border-brand-500/20',
    };
    return `${base} ${variants[this.toast().type]}`;
  });

  iconWrapperClasses = computed(() => {
    const variants = {
      success: 'text-green-500',
      error: 'text-red-500',
      warning: 'text-yellow-500',
      info: 'text-brand-500',
    };
    return `flex-shrink-0 ${variants[this.toast().type]}`;
  });
}