import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Inbox, LucideAngularModule } from 'lucide-angular';

import { ServicesHeroComponent } from './components/services-hero/services-hero.component';
import { ServicesFilterComponent, ServiceFilter } from './components/services-filter/services-filter.component';
import { ServicesGridComponent } from './components/services-grid/services-grid.component';
import { ServiceDetailModalComponent } from './components/service-detail-modal/service-detail-modal.component';
import { ServicesCtaComponent } from './components/services-cta/services-cta.component';

import { SpinnerComponent } from '../../../shared/components/ui/spinner/spinner.component';
import { EmptyStateComponent } from '../../../shared/components/ui/empty-state/empty-state.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';

import { ServiceCatalogApiService } from '../../../core/services/api/service-catalog-api.service';
import { SeoService } from '../../../core/services/utils/seo.service';
import { ServiceItem } from '../../../core/models/service/service-item.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ServicesHeroComponent,
    ServicesFilterComponent,
    ServicesGridComponent,
    ServiceDetailModalComponent,
    ServicesCtaComponent,
    SpinnerComponent,
    EmptyStateComponent,
    ButtonComponent,
  ],
  template: `
    <app-services-hero />

    <section class="pb-12">
      <div class="container-custom">

        <app-services-filter
          [selected]="currentFilter()"
          [counts]="counts()"
          (changed)="onFilterChange($event)"
        />

        @if (loading()) {
          <div class="flex flex-col items-center justify-center py-24">
            <app-spinner size="lg" />
            <p class="text-sm text-zinc-500 mt-4">Cargando servicios...</p>
          </div>
        } @else if (errored()) {
          <app-empty-state
            title="No pudimos cargar los servicios"
            description="Verifica tu conexión o intenta nuevamente en unos momentos."
            [icon]="Inbox"
          >
            <app-button variant="primary" (clicked)="loadServices()">
              Reintentar
            </app-button>
          </app-empty-state>
        } @else if (filteredServices().length === 0) {
          <app-empty-state
            title="No hay servicios en esta categoría"
            description="Prueba seleccionando otra categoría o contáctanos para una solución personalizada."
            [icon]="Inbox"
          >
            <app-button variant="primary" (clicked)="onFilterChange('all')">
              Ver todos
            </app-button>
          </app-empty-state>
        } @else {
          <app-services-grid
            [services]="filteredServices()"
            (selected)="onServiceSelected($event)"
          />
        }

      </div>
    </section>

    <app-services-cta />

    <app-service-detail-modal
      [open]="modalOpen()"
      [service]="selectedService()"
      (closed)="onModalClose()"
    />
  `,
})
export class ServicesComponent implements OnInit {
  private readonly api = inject(ServiceCatalogApiService);
  private readonly seo = inject(SeoService);

  readonly Inbox = Inbox;

  readonly allServices     = signal<ServiceItem[]>([]);
  readonly loading         = signal(true);
  readonly errored         = signal(false);
  readonly currentFilter   = signal<ServiceFilter>('all');
  readonly modalOpen       = signal(false);
  readonly selectedService = signal<ServiceItem | null>(null);

  readonly filteredServices = computed(() => {
    const filter = this.currentFilter();
    const all = this.allServices();
    return filter === 'all' ? all : all.filter(s => s.categoria === filter);
  });

  readonly counts = computed<Record<ServiceFilter, number>>(() => {
    const all = this.allServices();
    return {
      all:    all.length,
      web:    all.filter(s => s.categoria === 'web').length,
      app:    all.filter(s => s.categoria === 'app').length,
      ventas: all.filter(s => s.categoria === 'ventas').length,
      bot:    all.filter(s => s.categoria === 'bot').length,
    };
  });

  ngOnInit(): void {
    this.seo.setMetaTags({
      title: 'Servicios',
      description: 'Catálogo completo de servicios DMAN Systems: páginas web, apps móviles, sistemas de ventas y bots automatizados.',
    });
    this.loadServices();
  }

  loadServices(): void {
    this.loading.set(true);
    this.errored.set(false);

    this.api.findAllActive().subscribe({
      next: (services) => {
        this.allServices.set(services);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errored.set(true);
      },
    });
  }

  onFilterChange(filter: ServiceFilter): void {
    this.currentFilter.set(filter);
  }

  onServiceSelected(service: ServiceItem): void {
    this.selectedService.set(service);
    this.modalOpen.set(true);
  }

  onModalClose(): void {
    this.modalOpen.set(false);
    setTimeout(() => this.selectedService.set(null), 300);
  }
}
