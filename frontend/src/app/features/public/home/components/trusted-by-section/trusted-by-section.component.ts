import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trusted-by-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 border-y border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-950/50">
      <div class="container-custom">
        <p class="text-center text-xs uppercase tracking-[0.25em] text-zinc-500 mb-10 font-semibold">
          Empresas que confían en nosotros
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center max-w-5xl mx-auto">
          @for (logo of logos; track logo.name) {
            <div class="flex items-center gap-2 text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors duration-300 grayscale hover:grayscale-0">
              <span [innerHTML]="logo.icon" class="w-7 h-7 flex-shrink-0"></span>
              <span class="font-bold text-lg tracking-tight">{{ logo.name }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TrustedBySectionComponent {
  readonly logos = [
    {
      name: 'Nexus',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.65l7 3.5v7.7l-7-3.5v-7.7zm9 11.2v-7.7l7-3.5v7.7l-7 3.5z"/></svg>',
    },
    {
      name: 'Apex',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L1 21h22L12 2zm0 4l7.5 13H4.5L12 6z"/></svg>',
    },
    {
      name: 'Volta',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>',
    },
    {
      name: 'Kairos',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>',
    },
    {
      name: 'Flux',
      icon: '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h18v2H3V3zm2 4h14v2H5V7zm-2 4h18v2H3v-2zm2 4h14v2H5v-2zm-2 4h18v2H3v-2z"/></svg>',
    },
  ];
}
