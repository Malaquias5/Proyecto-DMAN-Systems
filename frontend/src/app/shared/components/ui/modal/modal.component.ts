import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, input, output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    @if (open()) {
      <div
        class="fixed inset-0 z-[1050] flex items-center justify-center p-4 animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          (click)="onBackdropClick()"
        ></div>

        <div [class]="containerClasses()">
          @if (showHeader()) {
            <div class="flex items-start justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div class="flex-1 min-w-0">
                @if (title()) {
                  <h2 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {{ title() }}
                  </h2>
                }
                @if (subtitle()) {
                  <p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {{ subtitle() }}
                  </p>
                }
              </div>

              @if (closable()) {
                <button
                  type="button"
                  (click)="closed.emit()"
                  class="ml-4 p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex-shrink-0"
                  aria-label="Cerrar"
                >
                  <lucide-icon [img]="X" class="w-5 h-5 text-zinc-500"></lucide-icon>
                </button>
              }
            </div>
          }

          <div class="p-6">
            <ng-content></ng-content>
          </div>

          @if (showFooter()) {
            <div class="flex items-center justify-end gap-2 p-6 border-t border-zinc-200 dark:border-zinc-800">
              <ng-content select="[modalFooter]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class ModalComponent {
  readonly open = input<boolean>(false);
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly size = input<ModalSize>('md');
  readonly closable = input<boolean>(true);
  readonly closeOnBackdrop = input<boolean>(true);
  readonly showHeader = input<boolean>(true);
  readonly showFooter = input<boolean>(false);

  readonly closed = output<void>();

  readonly X = X;

  readonly containerClasses = computed(() => {
    const base = 'relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full overflow-hidden animate-fade-in-up';

    const sizes: Record<ModalSize, string> = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-2xl',
    };
    return `${base} ${sizes[this.size()]}`;
  });

  onBackdropClick(): void {
    if (this.closeOnBackdrop() && this.closable()) {
      this.closed.emit();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open() && this.closable()) {
      this.closed.emit();
    }
  }
}
