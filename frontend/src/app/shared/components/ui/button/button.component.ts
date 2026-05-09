import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fullWidth = input<boolean>(false);
  iconLeft = input<any>(null);
  iconRight = input<any>(null);
  iconOnly = input<boolean>(false);

  clicked = output<MouseEvent>();

  classes = computed(() => {
    const base =
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:ring-brand-500';

    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-lg hover:shadow-brand-500/25',
      secondary:
        'bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-800',
      ghost:
        'bg-transparent hover:bg-zinc-100 text-zinc-700 dark:hover:bg-zinc-900 dark:text-zinc-300',
      danger:
        'bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-lg hover:shadow-red-500/25',
      success:
        'bg-green-500 hover:bg-green-600 text-white shadow-sm hover:shadow-lg hover:shadow-green-500/25',
    };

    const sizes: Record<ButtonSize, string> = {
      sm: this.iconOnly() ? 'p-2' : 'px-3 py-1.5 text-xs',
      md: this.iconOnly() ? 'p-2.5' : 'px-5 py-2.5 text-sm',
      lg: this.iconOnly() ? 'p-3' : 'px-6 py-3 text-base',
    };

    const width = this.fullWidth() ? 'w-full' : '';

    return `${base} ${variants[this.variant()]} ${sizes[this.size()]} ${width}`.trim();
  });

  onClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.clicked.emit(event);
    }
  }
}