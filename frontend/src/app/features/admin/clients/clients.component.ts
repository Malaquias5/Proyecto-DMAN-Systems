import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Inbox } from 'lucide-angular';

import { ClientsHeaderComponent } from './components/clients-header/clients-header.component';
import { ClientsFilterComponent, ClientServiceFilter } from './components/clients-filter/clients-filter.component';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientDetailModalComponent } from './components/client-detail-modal/client-detail-modal.component';

import { SpinnerComponent } from '../../../shared/components/ui/spinner/spinner.component';
import { EmptyStateComponent } from '../../../shared/components/ui/empty-state/empty-state.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { ConfirmationDialogComponent } from '../../../shared/components/widgets/confirmation-dialog/confirmation-dialog.component';

import { AdminApiService } from '../../../core/services/api/admin-api.service';
import { NotificationService } from '../../../core/services/utils/notification.service';
import { Client } from '../../../core/models';

@Component({
  selector: 'app-clients',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ClientsHeaderComponent,
    ClientsFilterComponent,
    ClientsTableComponent,
    ClientDetailModalComponent,
    SpinnerComponent,
    EmptyStateComponent,
    ButtonComponent,
    ConfirmationDialogComponent,
  ],
  template: `
    <app-clients-header
      [totalCount]="filteredClients().length"
      [searchTerm]="searchTerm()"
      (searchChanged)="onSearchChange($event)"
    />

    <app-clients-filter
      [selected]="currentFilter()"
      [counts]="filterCounts()"
      (changed)="onFilterChange($event)"
    />

    @if (loading()) {
      <div class="flex flex-col items-center justify-center py-24">
        <app-spinner size="lg" />
        <p class="text-sm text-zinc-500 mt-4">Cargando clientes...</p>
      </div>
    } @else if (errored()) {
      <app-empty-state
        title="No pudimos cargar los clientes"
        description="Verifica que el backend esté corriendo correctamente."
      >
        <app-button variant="primary" (clicked)="loadClients()">
          Reintentar
        </app-button>
      </app-empty-state>
    } @else if (filteredClients().length === 0) {
      @if (searchTerm() || currentFilter() !== 'all') {
        <app-empty-state
          title="No hay clientes con esos filtros"
          description="Prueba con otra búsqueda o cambia los filtros."
          [icon]="Inbox"
        >
          <app-button variant="secondary" (clicked)="resetFilters()">
            Limpiar filtros
          </app-button>
        </app-empty-state>
      } @else {
        <app-empty-state
          title="No hay clientes registrados"
          description="Cuando lleguen leads del formulario de contacto, aparecerán aquí."
          [icon]="Inbox"
        />
      }
    } @else {
      <app-clients-table
        #table
        [clients]="filteredClients()"
        [pageSize]="10"
        (view)="onViewClient($event)"
        (delete)="onDeleteRequest($event)"
      />
    }

    <app-client-detail-modal
      [open]="modalOpen()"
      [client]="selectedClient()"
      (closed)="onModalClose()"
      (deleted)="onDeleteRequest($event)"
    />

    <app-confirmation-dialog
      [open]="confirmDeleteOpen()"
      title="¿Eliminar cliente?"
      [message]="confirmMessage()"
      variant="danger"
      confirmText="Sí, eliminar"
      cancelText="Cancelar"
      [loading]="deleting()"
      (confirmed)="onConfirmDelete()"
      (cancelled)="onCancelDelete()"
    />
  `,
})
export class ClientsComponent implements OnInit {
  @ViewChild('table') table?: ClientsTableComponent;

  private api    = inject(AdminApiService);
  private notify = inject(NotificationService);

  Inbox = Inbox;

  allClients    = signal<Client[]>([]);
  loading       = signal(true);
  errored       = signal(false);
  searchTerm    = signal('');
  currentFilter = signal<ClientServiceFilter>('all');

  modalOpen      = signal(false);
  selectedClient = signal<Client | null>(null);

  confirmDeleteOpen = signal(false);
  clientToDelete    = signal<Client | null>(null);
  deleting          = signal(false);

  filteredClients = computed(() => {
    let list = this.allClients();
    const filter = this.currentFilter();
    const search = this.searchTerm().toLowerCase().trim();

    if (filter !== 'all') {
      list = list.filter(c => (c.servicio ?? 'otro') === filter);
    }

    if (search) {
      list = list.filter(c =>
        c.nombre.toLowerCase().includes(search) ||
        c.telefono.toLowerCase().includes(search) ||
        (c.email ?? '').toLowerCase().includes(search) ||
        (c.mensaje ?? '').toLowerCase().includes(search)
      );
    }

    return list;
  });

  filterCounts = computed<Record<ClientServiceFilter, number>>(() => {
    const all = this.allClients();
    return {
      all:    all.length,
      web:    all.filter(c => c.servicio === 'web').length,
      app:    all.filter(c => c.servicio === 'app').length,
      ventas: all.filter(c => c.servicio === 'ventas').length,
      bot:    all.filter(c => c.servicio === 'bot').length,
      otro:   all.filter(c => !c.servicio || c.servicio === 'otro').length,
    };
  });

  confirmMessage = computed(() => {
    const c = this.clientToDelete();
    if (!c) return '';
    return `¿Estás seguro de eliminar a ${c.nombre}? Esta acción no se puede deshacer.`;
  });

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading.set(true);
    this.errored.set(false);

    this.api.getClients().subscribe({
      next: (clients) => {
        this.allClients.set(clients);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        if (error.status !== 401 && error.status !== 403) {
          this.errored.set(true);
        }
      },
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.table?.resetPage();
  }

  onFilterChange(filter: ClientServiceFilter): void {
    this.currentFilter.set(filter);
    this.table?.resetPage();
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.currentFilter.set('all');
    this.table?.resetPage();
  }

  onViewClient(client: Client): void {
    this.selectedClient.set(client);
    this.modalOpen.set(true);
  }

  onModalClose(): void {
    this.modalOpen.set(false);
    setTimeout(() => this.selectedClient.set(null), 300);
  }

  onDeleteRequest(client: Client): void {
    this.clientToDelete.set(client);
    this.modalOpen.set(false);
    this.confirmDeleteOpen.set(true);
  }

  onCancelDelete(): void {
    this.confirmDeleteOpen.set(false);
    setTimeout(() => this.clientToDelete.set(null), 300);
  }

  onConfirmDelete(): void {
    const client = this.clientToDelete();
    if (!client) return;

    this.deleting.set(true);

    this.api.deleteClient(client.id).subscribe({
      next: () => {
        this.allClients.update(list => list.filter(c => c.id !== client.id));
        this.deleting.set(false);
        this.confirmDeleteOpen.set(false);
        this.clientToDelete.set(null);
        this.notify.success('Cliente eliminado', `${client.nombre} fue eliminado correctamente`);
      },
      error: (error: HttpErrorResponse) => {
        this.deleting.set(false);
        if (error.status !== 401 && error.status !== 403) {
          this.notify.error('No se pudo eliminar', 'Intenta nuevamente en unos momentos');
        }
      },
    });
  }
}
