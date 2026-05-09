import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BadgeComponent } from '../../../../../shared/components/ui/badge/badge.component';

@Component({
  selector: 'app-services-hero',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <section class="relative pt-20 pb-12 overflow-hidden">

      <div class="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/[0.08] blur-[120px]"></div>
      </div>

      <div
        class="absolute inset-0 -z-10 opacity-30 dark:opacity-20 pointer-events-none"
        style="background-image: linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px); background-size: 60px 60px;"
        aria-hidden="true"
      ></div>

      <div class="container-custom relative">
        <div class="text-center max-w-3xl mx-auto">

          <div class="mb-6">
            <app-badge variant="brand" [dot]="true" class="inline-flex">
              Catálogo de servicios
            </app-badge>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5 text-zinc-900 dark:text-zinc-100">
            Soluciones que
            <span class="bg-gradient-to-r from-brand-500 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              transforman
            </span>
            tu negocio
          </h1>

          <p class="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Cada servicio diseñado a medida, con tecnología moderna y atención al detalle.
            Encuentra la solución perfecta para tu proyecto.
          </p>

        </div>
      </div>
    </section>
  `,
})
export class ServicesHeroComponent {}
