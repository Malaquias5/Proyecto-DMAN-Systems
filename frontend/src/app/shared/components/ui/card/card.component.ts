import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export type CardVariant = 'default' | 'glass' | 'bordered' | 'glow';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="classes()">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  variant = input<CardVariant>('default');
  interactive = input<boolean>(false);
  padding = input<boolean>(true);

  classes = computed(() => {
    const base = 'rounded-xl transition-all duration-300';

    const variants: Record<CardVariant, string> = {
      default: 'bg-white border border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800',
      glass:
        'backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-800/50',
      bordered: 'bg-transparent border border-zinc-200 dark:border-zinc-800',
      glow:
        'bg-white border border-brand-500/30 dark:bg-zinc-900/50 shadow-lg shadow-brand-500/10',
    };

    const interactive = this.interactive()
      ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700'
      : '';

    const padding = this.padding() ? 'p-6' : '';

    return `${base} ${variants[this.variant()]} ${interactive} ${padding}`.trim();
  });
}