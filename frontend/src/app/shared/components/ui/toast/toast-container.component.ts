import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { NotificationService } from '@core/services/utils/notification.service';
import { ToastComponent } from './toast.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div
      class="fixed top-20 right-4 z-[1080] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      @for (toast of toasts(); track toast.id) {
        <div class="pointer-events-auto">
          <app-toast
            [toast]="toast"
            (dismiss)="onDismiss($event)"
          />
        </div>
      }
    </div>
  `,
})
export class ToastContainerComponent {
  readonly notify = inject(NotificationService);
  toasts = this.notify.toasts;

  onDismiss(id: number): void {
    this.notify.dismiss(id);
  }
}