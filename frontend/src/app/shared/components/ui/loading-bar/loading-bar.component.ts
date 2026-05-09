import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { LoadingService } from '@core/services/utils/loading.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loading.isLoading()) {
      <div class="fixed top-0 inset-x-0 z-[1090] h-0.5 bg-brand-500/20 overflow-hidden pointer-events-none">
        <div class="h-full w-1/3 bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-shimmer"
             style="background-size: 200% 100%;"></div>
      </div>
    }
  `,
})
export class LoadingBarComponent {
  readonly loading: LoadingService = inject(LoadingService);
}