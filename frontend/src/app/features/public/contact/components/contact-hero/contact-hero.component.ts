import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BadgeComponent } from '../../../../../shared/components/ui/badge/badge.component';

@Component({
  selector: 'app-contact-hero',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <section class="relative pt-20 pb-12 overflow-hidden">

      <div class="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/8 blur-[120px]"></div>
      </div>

      <div class="container-custom relative">
        <div class="text-center max-w-3xl mx-auto">

          <div data-aos="fade-down">
            <app-badge variant="success" [dot]="true" class="inline-flex mb-6">
              Disponibles ahora · Respuesta en menos de 24h
            </app-badge>
          </div>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 text-zinc-900 dark:text-zinc-100"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Hablemos de
            <span class="bg-gradient-to-r from-brand-500 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              tu proyecto
            </span>
          </h1>

          <p
            class="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Cuéntanos qué necesitas. Te asesoramos sin compromiso y diseñamos la mejor
            solución para tu negocio.
          </p>
        </div>
      </div>
    </section>
  `,
})
export class ContactHeroComponent {}
