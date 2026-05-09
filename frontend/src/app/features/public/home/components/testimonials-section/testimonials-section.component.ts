import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Quote, Star } from 'lucide-angular';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <section class="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      <!-- Subtle gradient accents -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px]" aria-hidden="true"></div>

      <div class="container-custom relative">

        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">
            Testimonios
          </span>
          <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-100">
            Lo que dicen
            <span class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">nuestros clientes</span>
          </h2>
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
            Más de 50 proyectos entregados con resultados que hablan por sí solos.
          </p>
        </div>

        <!-- Testimonials grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          @for (t of testimonials; track t.name; let i = $index) {
            <div
              class="group relative p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              [style.animation-delay]="(i * 100) + 'ms'"
            >
              <!-- Quote icon -->
              <div class="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <lucide-icon [img]="QuoteIcon" class="w-12 h-12 text-blue-500"></lucide-icon>
              </div>

              <!-- Stars -->
              <div class="flex gap-0.5 mb-4">
                @for (s of [1,2,3,4,5]; track s) {
                  <lucide-icon [img]="StarIcon" class="w-4 h-4 fill-amber-400 text-amber-400"></lucide-icon>
                }
              </div>

              <!-- Quote text -->
              <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 relative z-10">
                "{{ t.quote }}"
              </p>

              <!-- Author -->
              <div class="flex items-center gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <img
                  [src]="t.avatar"
                  [alt]="t.name"
                  class="w-12 h-12 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700"
                  loading="lazy"
                />
                <div>
                  <div class="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                    {{ t.name }}
                  </div>
                  <div class="text-xs text-zinc-500 dark:text-zinc-400">
                    {{ t.role }} · <span class="text-brand-500 font-medium">{{ t.company }}</span>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class TestimonialsSectionComponent {
  readonly QuoteIcon = Quote;
  readonly StarIcon = Star;

  readonly testimonials: Testimonial[] = [
    {
      quote: 'El equipo de DMAN entregó nuestra plataforma de ventas en tiempo récord. La calidad del código y la atención al detalle son excepcionales.',
      name: 'María González',
      role: 'CEO',
      company: 'NexusMed',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
    },
    {
      quote: 'Nuestro bot de WhatsApp aumentó la conversión un 40%. La automatización funcionó exactamente como esperábamos. Súper recomendados.',
      name: 'Carlos Mendoza',
      role: 'Gerente de Operaciones',
      company: 'Apex Logistics',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
    },
    {
      quote: 'Trabajar con DMAN fue una experiencia profesional de principio a fin. La aplicación móvil superó nuestras expectativas en todo sentido.',
      name: 'Lucía Vargas',
      role: 'CTO',
      company: 'Volta Energy',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
    },
  ];
}
