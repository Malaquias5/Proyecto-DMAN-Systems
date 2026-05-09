import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type BadgeVariant = 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="classes()">
      @if (dot()) {
        <span [class]="dotClasses()"></span>
      }
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  variant = input<BadgeVariant>('neutral');
  size = input<BadgeSize>('sm');
  dot = input<boolean>(false);

  classes = computed(() => {
    const base = 'inline-flex items-center gap-1.5 font-medium rounded-full whitespace-nowrap';

    const variants: Record<BadgeVariant, string> = {
      brand: 'bg-brand-500/10 text-brand-600 dark:text-brand-400',
      success: 'bg-green-500/10 text-green-600 dark:text-green-400',
      warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      danger: 'bg-red-500/10 text-red-600 dark:text-red-400',
      neutral: 'bg-zinc-200/50 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300',
    };

    const sizes: Record<BadgeSize, string> = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return `${base} ${variants[this.variant()]} ${sizes[this.size()]}`;
  });

  dotClasses = computed(() => {
    const colors: Record<BadgeVariant, string> = {
      brand: 'bg-brand-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
      neutral: 'bg-zinc-500',
    };
    return `w-1.5 h-1.5 rounded-full ${colors[this.variant()]}`;
  });
}