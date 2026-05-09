import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ArrowRight,
  Bot,
  Check,
  Globe,
  LucideAngularModule,
  MessageCircle,
  Smartphone,
  ShoppingCart,
} from 'lucide-angular';

import { ModalComponent } from '../../../../../shared/components/ui/modal/modal.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { ServiceItem } from '../../../../../core/models/service/service-item.model';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-service-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ModalComponent,
    ButtonComponent,
  ],
  template: `
    <app-modal
      [open]="open()"
      [showHeader]="false"
      size="xl"
      (closed)="onClose()"
    >
      @if (service(); as svc) {
        <div>

          <!-- Encabezado con icono y nombre -->
          <div class="flex items-center gap-4 mb-6 pr-8">
            <div [class]="'w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ' + iconBg()">
              <lucide-icon
                [img]="categoryIcon()"
                [class]="'w-8 h-8 ' + iconColor()"
              ></lucide-icon>
            </div>
            <div>
              <span [class]="'inline-block text-xs font-semibold uppercase tracking-wider mb-1 ' + iconColor()">
                {{ svc.categoria }}
              </span>
              <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {{ svc.nombre }}
              </h2>
            </div>
          </div>

          <!-- Descripción -->
          <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
            {{ svc.descripcion }}
          </p>

          <!-- ¿Qué incluye? -->
          <div class="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-5 mb-6">
            <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <lucide-icon [img]="Check" [class]="'w-4 h-4 ' + iconColor()"></lucide-icon>
              ¿Qué incluye?
            </h3>
            <ul class="space-y-2.5">
              @for (feature of detailedFeatures(); track feature) {
                <li class="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <lucide-icon
                    [img]="Check"
                    [class]="'w-4 h-4 flex-shrink-0 mt-0.5 ' + iconColor()"
                  ></lucide-icon>
                  <span>{{ feature }}</span>
                </li>
              }
            </ul>
          </div>

          <!-- Mini stats -->
          <div class="grid grid-cols-3 gap-3 mb-6 text-center">
            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
              <div class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">2-4</div>
              <div class="text-xs text-zinc-500 mt-0.5">semanas</div>
            </div>
            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
              <div class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">100%</div>
              <div class="text-xs text-zinc-500 mt-0.5">a medida</div>
            </div>
            <div class="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
              <div class="text-2xl font-bold text-zinc-900 dark:text-zinc-100">3 meses</div>
              <div class="text-xs text-zinc-500 mt-0.5">soporte gratis</div>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-2">
            <app-button
              variant="primary"
              [iconRight]="ArrowRight"
              [fullWidth]="true"
              (clicked)="onContactClick()"
            >
              Cotizar este servicio
            </app-button>

            <a
              [href]="whatsappUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all duration-200 active:scale-[0.98] whitespace-nowrap"
            >
              <lucide-icon [img]="MessageCircle" class="w-4 h-4"></lucide-icon>
              WhatsApp
            </a>
          </div>

        </div>
      }
    </app-modal>
  `,
})
export class ServiceDetailModalComponent {
  open    = input<boolean>(false);
  service = input<ServiceItem | null>(null);

  closed = output<void>();

  private readonly router = inject(Router);

  readonly ArrowRight = ArrowRight;
  readonly Check = Check;
  readonly MessageCircle = MessageCircle;

  private readonly iconMap: Record<string, unknown> = {
    web:    Globe,
    app:    Smartphone,
    ventas: ShoppingCart,
    bot:    Bot,
  };

  private readonly colorMap: Record<string, { color: string; bg: string }> = {
    web:    { color: 'text-brand-500',  bg: 'bg-brand-500/10'  },
    app:    { color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ventas: { color: 'text-green-500',  bg: 'bg-green-500/10'  },
    bot:    { color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  };

  private readonly detailedFeaturesMap: Record<string, string[]> = {
    web: [
      'Diseño 100% personalizado y responsive',
      'Optimización para motores de búsqueda (SEO)',
      'Integración con Google Analytics y Meta Pixel',
      'Panel de administración intuitivo',
      'Hosting y dominio el primer año incluido',
      'Certificado SSL gratuito (HTTPS)',
      'Mantenimiento por 3 meses',
    ],
    app: [
      'Aplicación nativa para iOS y Android',
      'Diseño UI/UX moderno y atractivo',
      'Notificaciones push integradas',
      'Sincronización con backend en la nube',
      'Soporte multi-idioma',
      'Publicación en App Store y Google Play',
      'Mantenimiento técnico por 3 meses',
    ],
    ventas: [
      'Control de inventario en tiempo real',
      'Gestión de ventas, compras y devoluciones',
      'Reportes y dashboards personalizables',
      'Multi-usuario con permisos por rol',
      'Facturación electrónica integrada (SUNAT)',
      'Acceso desde cualquier dispositivo',
      'Capacitación al equipo incluida',
    ],
    bot: [
      'Bot de WhatsApp Business o Telegram',
      'Respuestas automáticas 24/7',
      'Integración con CRM y bases de datos',
      'Flujos conversacionales personalizados',
      'IA para entender lenguaje natural',
      'Reportes de conversaciones e interacciones',
      'Configuración y entrenamiento incluido',
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoryIcon = computed<any>(() => this.iconMap[this.service()?.categoria ?? 'web'] ?? Globe);

  iconColor = computed(() => this.colorMap[this.service()?.categoria ?? 'web']?.color ?? 'text-brand-500');

  iconBg = computed(() => this.colorMap[this.service()?.categoria ?? 'web']?.bg ?? 'bg-brand-500/10');

  detailedFeatures = computed(() => this.detailedFeaturesMap[this.service()?.categoria ?? 'web'] ?? []);

  whatsappUrl = computed(() => {
    const phone = environment.whatsappPhone;
    const msg = `Hola DMAN Systems, me interesa el servicio de ${this.service()?.nombre ?? ''}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  });

  onClose(): void {
    this.closed.emit();
  }

  onContactClick(): void {
    this.onClose();
    this.router.navigate(['/contacto'], {
      queryParams: { servicio: this.service()?.categoria ?? '' },
    });
  }
}
