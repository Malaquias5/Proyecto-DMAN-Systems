import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Inbox, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div class="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
        <lucide-icon
          [img]="icon() ?? Inbox"
          class="w-8 h-8 text-zinc-400 dark:text-zinc-600"
        ></lucide-icon>
      </div>

      <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        {{ title() }}
      </h3>

      @if (description()) {
        <p class="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
          {{ description() }}
        </p>
      }

      <div class="mt-6">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class EmptyStateComponent {
  title = input.required<string>();
  description = input<string>('');
  icon = input<any>(null);

  Inbox = Inbox;
}