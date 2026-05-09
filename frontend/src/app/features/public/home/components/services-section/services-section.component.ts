import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  Bot,
  Globe,
  LucideAngularModule,
  Smartphone,
  ShoppingCart,
} from 'lucide-angular';

import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { SpinnerComponent } from '../../../../../shared/components/ui/spinner/spinner.component';
import { ServiceCatalogApiService } from '../../../../../core/services/api/service-catalog-api.service';
import { ServiceItem } from '../../../../../core/models/service/service-item.model';

interface ServiceCardConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  iconColor: string;
  iconBg: string;
  tagColor: string;
  tagBg: string;
}

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    ButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './services-section.component.html',
})
export class ServicesSectionComponent implements OnInit {
  private readonly api = inject(ServiceCatalogApiService);

  readonly ArrowRight = ArrowRight;

  readonly services = signal<ServiceItem[]>([]);
  readonly loading = signal(true);
  readonly errored = signal(false);

  private readonly categoryConfig: Record<string, ServiceCardConfig> = {
    web: {
      icon: Globe,
      iconColor: 'text-white',
      iconBg: 'bg-blue-500/80',
      tagColor: 'text-blue-700 dark:text-blue-300',
      tagBg: 'bg-blue-500/10',
    },
    app: {
      icon: Smartphone,
      iconColor: 'text-white',
      iconBg: 'bg-purple-500/80',
      tagColor: 'text-purple-700 dark:text-purple-300',
      tagBg: 'bg-purple-500/10',
    },
    ventas: {
      icon: ShoppingCart,
      iconColor: 'text-white',
      iconBg: 'bg-emerald-500/80',
      tagColor: 'text-emerald-700 dark:text-emerald-300',
      tagBg: 'bg-emerald-500/10',
    },
    bot: {
      icon: Bot,
      iconColor: 'text-white',
      iconBg: 'bg-amber-500/80',
      tagColor: 'text-amber-700 dark:text-amber-300',
      tagBg: 'bg-amber-500/10',
    },
  };

  private readonly categoryImages: Record<string, string> = {
    web: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    app: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    ventas: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    bot: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  };

  private readonly categoryTags: Record<string, string[]> = {
    web: ['Angular', 'React', 'SEO'],
    app: ['Flutter', 'React Native', 'iOS'],
    ventas: ['Inventario', 'Reportes', 'POS'],
    bot: ['WhatsApp', 'IA', '24/7'],
  };

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.loading.set(true);
    this.errored.set(false);

    this.api.findAllActive().subscribe({
      next: (services) => {
        this.services.set(services);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errored.set(true);
        this.services.set(this.getFallbackServices());
      },
    });
  }

  getConfig(categoria: string): ServiceCardConfig {
    return this.categoryConfig[categoria] ?? this.categoryConfig['web'];
  }

  getImageUrl(categoria: string): string {
    return this.categoryImages[categoria] ?? this.categoryImages['web'];
  }

  getTags(categoria: string): string[] {
    return this.categoryTags[categoria] ?? [];
  }

  private getFallbackServices(): ServiceItem[] {
    return [
      {
        id: 1,
        nombre: 'Páginas Web',
        descripcion: 'Sitios modernos, responsivos y optimizados para SEO. Diseñados para convertir visitantes en clientes.',
        categoria: 'web',
        icono: 'globe',
        activo: true,
      },
      {
        id: 2,
        nombre: 'Aplicaciones Móviles',
        descripcion: 'Apps nativas y multiplataforma para iOS y Android. Experiencias fluidas que tus clientes amarán usar.',
        categoria: 'app',
        icono: 'smartphone',
        activo: true,
      },
      {
        id: 3,
        nombre: 'Sistemas de Ventas',
        descripcion: 'POS personalizados con control de inventario, ventas, reportes y facturación electrónica integrada.',
        categoria: 'ventas',
        icono: 'shopping-cart',
        activo: true,
      },
      {
        id: 4,
        nombre: 'Bots Automatizados',
        descripcion: 'Bots de WhatsApp, Telegram y chatbots inteligentes para atención al cliente 24/7 y automatización.',
        categoria: 'bot',
        icono: 'bot',
        activo: true,
      },
    ];
  }
}
