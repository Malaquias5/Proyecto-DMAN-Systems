import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

import { ThemeStateService } from '../../../../core/services/state/theme-state.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      type="button"
      (click)="theme.toggle()"
      [attr.aria-label]="theme.isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
      class="relative w-10 h-10 rounded-lg flex items-center justify-center
             text-zinc-700 dark:text-zinc-300
             hover:bg-zinc-100 dark:hover:bg-zinc-900
             transition-all duration-200
             focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <div class="relative w-5 h-5">
        <lucide-icon
          [img]="Sun"
          class="absolute inset-0 w-5 h-5 transition-all duration-500"
          [class.opacity-100]="theme.isDark()"
          [class.opacity-0]="!theme.isDark()"
          [class.rotate-0]="theme.isDark()"
          [class.-rotate-90]="!theme.isDark()"
        ></lucide-icon>

        <lucide-icon
          [img]="Moon"
          class="absolute inset-0 w-5 h-5 transition-all duration-500"
          [class.opacity-100]="!theme.isDark()"
          [class.opacity-0]="theme.isDark()"
          [class.rotate-0]="!theme.isDark()"
          [class.rotate-90]="theme.isDark()"
        ></lucide-icon>
      </div>
    </button>
  `,
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeStateService);
  readonly Sun = Sun;
  readonly Moon = Moon;
}
