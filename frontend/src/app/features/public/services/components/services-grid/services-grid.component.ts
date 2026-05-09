import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import {
  ArrowRight,
  Bot,
  Check,
  Globe,
  LucideAngularModule,
  Smartphone,
  ShoppingCart,
} from 'lucide-angular';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { ServiceItem } from '../../../../../core/models/service/service-item.model';

interface CategoryConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  iconColor: string;
  iconBg: string;
}

@Component({
  selector: 'app-services-grid',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, CardComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      @for (service of services(); track service.id; let i = $index) {
        <div [attr.data-aos-delay]="(i % 6) * 80">
          <app-card variant="default" [interactive]="true" class="block h-full">
            <div
              class="flex flex-col h-full cursor-pointer group"
              (click)="onSelect(service)"
              (keydown.enter)="onSelect(service)"
              role="button"
              tabindex="0"
              [attr.aria-label]="'Ver detalles de ' + service.nombre"
            >

              <!-- Icono + Categoría -->
              <div class="flex items-start justify-between mb-5">
                <div [class]="'w-12 h-12 rounded-xl flex items-center justify-center ' + getConfig(service.categoria).iconBg">
                  <lucide-icon
                    [img]="getConfig(service.categoria).icon"
                    [class]="'w-6 h-6 ' + getConfig(service.categoria).iconColor"
                  ></lucide-icon>
                </div>
                <span [class]="'text-xs font-semibold uppercase tracking-wider ' + getConfig(service.categoria).iconColor">
                  {{ service.categoria }}
                </span>
              </div>

              <!-- Nombre -->
              <h3 class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {{ service.nombre }}
              </h3>

              <!-- Descripción -->
              <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 flex-1 line-clamp-3">
                {{ service.descripcion }}
              </p>

              <!-- Features mini -->
              <ul class="space-y-1.5 mb-5">
                @for (feature of getFeatures(service.categoria); track feature) {
                  <li class="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <lucide-icon
                      [img]="Check"
                      [class]="'w-3.5 h-3.5 flex-shrink-0 ' + getConfig(service.categoria).iconColor"
                    ></lucide-icon>
                    <span>{{ feature }}</span>
                  </li>
                }
              </ul>

              <!-- Ver detalles -->
              <div [class]="'inline-flex items-center gap-1.5 text-sm font-medium pt-3 border-t border-zinc-100 dark:border-zinc-800 ' + getConfig(service.categoria).iconColor">
                <span>Ver detalles</span>
                <lucide-icon [img]="ArrowRight" class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"></lucide-icon>
              </div>

            </div>
          </app-card>
        </div>
      }
    </div>
  `,
})
export class ServicesGridComponent {
  services = input.required<ServiceItem[]>();
  selected = output<ServiceItem>();

  readonly ArrowRight = ArrowRight;
  readonly Check = Check;

  private readonly categoryConfig: Record<string, CategoryConfig> = {
    web:    { icon: Globe,         iconColor: 'text-brand-500',  iconBg: 'bg-brand-500/10'  },
    app:    { icon: Smartphone,    iconColor: 'text-purple-500', iconBg: 'bg-purple-500/10' },
    ventas: { icon: ShoppingCart,  iconColor: 'text-green-500',  iconBg: 'bg-green-500/10'  },
    bot:    { icon: Bot,           iconColor: 'text-yellow-500', iconBg: 'bg-yellow-500/10' },
  };

  private readonly categoryFeatures: Record<string, string[]> = {
    web:    ['Diseño responsive',       'Optimización SEO',          'Hosting incluido'    ],
    app:    ['iOS y Android',           'Notificaciones push',       'Sin code splits'     ],
    ventas: ['Control de inventario',   'Reportes en tiempo real',   'Multi-usuario'       ],
    bot:    ['WhatsApp Business',       'Respuestas 24/7',           'Integración con CRM' ],
  };

  getConfig(categoria: string): CategoryConfig {
    return this.categoryConfig[categoria] ?? this.categoryConfig['web'];
  }

  getFeatures(categoria: string): string[] {
    return this.categoryFeatures[categoria] ?? [];
  }

  onSelect(service: ServiceItem): void {
    this.selected.emit(service);
  }
}
