import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Info, LucideAngularModule, Trash2 } from 'lucide-angular';

import { ButtonComponent } from '../../ui/button/button.component';
import { ModalComponent } from '../../ui/modal/modal.component';

export type ConfirmationVariant = 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent, ModalComponent],
  template: `
    <app-modal
      [open]="open()"
      [showHeader]="false"
      [showFooter]="false"
      size="sm"
      [closable]="!loading()"
      (closed)="cancelled.emit()"
    >
      <div class="text-center">
        <div [class]="iconWrapperClasses()">
          <lucide-icon [img]="iconForVariant()" class="w-6 h-6"></lucide-icon>
        </div>

        <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
          {{ title() }}
        </h3>

        <p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
          {{ message() }}
        </p>

        <div class="flex items-center gap-2">
          <app-button
            variant="secondary"
            [fullWidth]="true"
            [disabled]="loading()"
            (clicked)="cancelled.emit()"
          >
            {{ cancelText() }}
          </app-button>

          <app-button
            [variant]="confirmVariant()"
            [fullWidth]="true"
            [loading]="loading()"
            (clicked)="confirmed.emit()"
          >
            {{ confirmText() }}
          </app-button>
        </div>
      </div>
    </app-modal>
  `,
})
export class ConfirmationDialogComponent {
  readonly open = input<boolean>(false);
  readonly title = input<string>('¿Estás seguro?');
  readonly message = input<string>('Esta acción no se puede deshacer.');
  readonly variant = input<ConfirmationVariant>('warning');
  readonly confirmText = input<string>('Confirmar');
  readonly cancelText = input<string>('Cancelar');
  readonly loading = input<boolean>(false);

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  readonly iconForVariant = computed(() => {
    const v = this.variant();
    if (v === 'danger') {
      return Trash2;
    }
    if (v === 'info') {
      return Info;
    }
    return Info;
  });

  readonly iconWrapperClasses = computed(() => {
    const v = this.variant();
    const colors: Record<ConfirmationVariant, string> = {
      danger: 'bg-red-100 dark:bg-red-500/10 text-red-500',
      warning: 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-500',
      info: 'bg-brand-100 dark:bg-brand-500/10 text-brand-500',
    };
    return `w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${colors[v]}`;
  });

  readonly confirmVariant = computed(() => {
    const v = this.variant();
    if (v === 'danger') {
      return 'danger' as const;
    }
    return 'primary' as const;
  });
}
