import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule, Sparkles } from 'lucide-angular';

import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';

@Component({
  selector: 'app-services-cta',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ButtonComponent],
  template: `
    <section class="py-24">
      <div class="container-custom">
        <div class="relative max-w-3xl mx-auto text-center">

          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 text-xs font-semibold uppercase tracking-wider mb-6">
            <lucide-icon [img]="Sparkles" class="w-3.5 h-3.5"></lucide-icon>
            ¿No encuentras lo que buscas?
          </div>

          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
            Cuéntanos tu idea y la
            <span class="text-brand-500">hacemos realidad</span>
          </h2>

          <p class="text-zinc-600 dark:text-zinc-400 max-w-md mx-auto mb-8 leading-relaxed">
            Cada proyecto es único. Si tienes algo en mente que no aparece en nuestro
            catálogo, conversemos y diseñamos una solución a la medida.
          </p>

          <app-button
            variant="primary"
            size="lg"
            [iconRight]="ArrowRight"
            routerLink="/contacto"
          >
            Conversemos
          </app-button>

        </div>
      </div>
    </section>
  `,
})
export class ServicesCtaComponent {
  readonly ArrowRight = ArrowRight;
  readonly Sparkles = Sparkles;
}
