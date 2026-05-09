import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { LucideAngularModule, Minus, TrendingDown, TrendingUp } from 'lucide-angular';

export type StatColor = 'brand' | 'success' | 'warning' | 'danger' | 'purple';
export type TrendDirection = 'up' | 'down' | 'neutral';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="card hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
      <div class="flex items-start justify-between mb-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {{ label() }}
        </span>

        @if (icon()) {
          <div [class]="iconWrapperClasses()">
            <lucide-icon [img]="icon()" class="w-4 h-4"></lucide-icon>
          </div>
        }
      </div>

      <div class="flex items-baseline gap-2 mb-1">
        <span class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-none">
          {{ value() }}
        </span>
        @if (suffix()) {
          <span class="text-sm text-zinc-500 dark:text-zinc-400">{{ suffix() }}</span>
        }
      </div>

      @if (trend()) {
        <div [class]="trendClasses()">
          <lucide-icon [img]="trendIcon()" class="w-3.5 h-3.5"></lucide-icon>
          <span>{{ trend() }}</span>
          @if (trendLabel()) {
            <span class="text-zinc-500 dark:text-zinc-500 font-normal">{{ trendLabel() }}</span>
          }
        </div>
      } @else if (description()) {
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{{ description() }}</p>
      }
    </div>
  `,
})
export class StatCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string | number>();
  readonly suffix = input<string>('');
  readonly icon = input<any>(null);
  readonly color = input<StatColor>('brand');
  readonly trend = input<string>('');
  readonly trendDirection = input<TrendDirection>('neutral');
  readonly trendLabel = input<string>('');
  readonly description = input<string>('');

  readonly iconWrapperClasses = computed(() => {
    const variants: Record<StatColor, string> = {
      brand: 'bg-brand-500/10 text-brand-500',
      success: 'bg-green-500/10 text-green-500',
      warning: 'bg-yellow-500/10 text-yellow-500',
      danger: 'bg-red-500/10 text-red-500',
      purple: 'bg-purple-500/10 text-purple-500',
    };
    return `w-8 h-8 rounded-lg flex items-center justify-center ${variants[this.color()]}`;
  });

  readonly trendIcon = computed(() => {
    const dir = this.trendDirection();
    if (dir === 'up') {
      return TrendingUp;
    }
    if (dir === 'down') {
      return TrendingDown;
    }
    return Minus;
  });

  readonly trendClasses = computed(() => {
    const dir = this.trendDirection();
    const colors: Record<TrendDirection, string> = {
      up: 'text-green-500',
      down: 'text-red-500',
      neutral: 'text-zinc-500',
    };
    return `inline-flex items-center gap-1 text-xs font-medium ${colors[dir]}`;
  });
}
