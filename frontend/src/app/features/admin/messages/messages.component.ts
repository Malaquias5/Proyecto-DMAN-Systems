import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, computed,
  inject, OnInit, signal, ViewChild
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Inbox } from 'lucide-angular';

import { MessagesHeaderComponent } from './components/messages-header/messages-header.component';
import { MessagesTabsComponent, MessageTab } from './components/messages-tabs/messages-tabs.component';
import { MessagesTableComponent } from './components/messages-table/messages-table.component';
import { MessageDetailModalComponent } from './components/message-detail-modal/message-detail-modal.component';

import { SpinnerComponent } from '../../../shared/components/ui/spinner/spinner.component';
import { EmptyStateComponent } from '../../../shared/components/ui/empty-state/empty-state.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { ConfirmationDialogComponent } from '../../../shared/components/widgets/confirmation-dialog/confirmation-dialog.component';

import { AdminApiService } from '../../../core/services/api/admin-api.service';
import { NotificationService } from '../../../core/services/utils/notification.service';
import { ContactMessage } from '../../../core/models/contact/contact-message.model';
import { MessageStatus } from '../../../core/enums/message-status.enum';

@Component({
  selector: 'app-messages',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MessagesHeaderComponent,
    MessagesTabsComponent,
    MessagesTableComponent,
    MessageDetailModalComponent,
    SpinnerComponent,
    EmptyStateComponent,
    ButtonComponent,
    ConfirmationDialogComponent,
  ],
  template: `
    <app-messages-header
      [totalCount]="filteredMessages().length"
      [searchTerm]="searchTerm()"
      [refreshing]="refreshing()"
      (searchChanged)="onSearchChange($event)"
      (refresh)="loadMessages(true)"
    />

    <app-messages-tabs
      [selected]="currentTab()"
      [counts]="tabCounts()"
      (changed)="onTabChange($event)"
    />

    @if (loading()) {
      <div class="flex flex-col items-center justify-center py-24">
        <app-spinner size="lg" />
        <p class="text-sm text-zinc-500 mt-4">Cargando mensajes...</p>
      </div>
    } @else if (errored()) {
      <app-empty-state
        title="No pudimos cargar los mensajes"
        description="Verifica que el backend esté corriendo correctamente."
      >
        <app-button variant="primary" (clicked)="loadMessages(false)">
          Reintentar
        </app-button>
      </app-empty-state>
    } @else if (filteredMessages().length === 0) {
      @if (searchTerm() || currentTab() !== 'all') {
        <app-empty-state
          title="No hay mensajes con esos filtros"
          description="Prueba con otra búsqueda o cambia el tab."
          [icon]="Inbox"
        >
          <app-button variant="secondary" (clicked)="resetFilters()">
            Limpiar filtros
          </app-button>
        </app-empty-state>
      } @else {
        <app-empty-state
          title="No hay mensajes aún"
          description="Cuando los visitantes envíen el formulario de contacto, aparecerán aquí."
          [icon]="Inbox"
        />
      }
    } @else {
      <app-messages-table
        #table
        [messages]="filteredMessages()"
        [pageSize]="10"
        [updatingIds]="updatingIds()"
        (view)="onViewMessage($event)"
        (delete)="onDeleteRequest($event)"
        (toggleStatus)="updateStatus($event)"
      />
    }

    <app-message-detail-modal
      [open]="modalOpen()"
      [message]="selectedMessage()"
      [updating]="modalUpdating()"
      (closed)="onModalClose()"
      (toggleStatus)="updateStatus($event, true)"
      (deleted)="onDeleteRequest($event)"
    />

    <app-confirmation-dialog
      [open]="confirmDeleteOpen()"
      title="¿Eliminar mensaje?"
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
export class MessagesComponent implements OnInit {
  @ViewChild('table') table?: MessagesTableComponent;

  private readonly api    = inject(AdminApiService);
  private readonly notify = inject(NotificationService);
  private readonly route  = inject(ActivatedRoute);
  private readonly router = inject(Router);

  Inbox = Inbox;
  MessageStatus = MessageStatus;

  allMessages = signal<ContactMessage[]>([]);
  loading     = signal(true);
  refreshing  = signal(false);
  errored     = signal(false);
  searchTerm  = signal('');
  currentTab  = signal<MessageTab>('all');

  modalOpen       = signal(false);
  selectedMessage = signal<ContactMessage | null>(null);
  modalUpdating   = signal(false);

  updatingIds       = signal<Set<number>>(new Set());
  confirmDeleteOpen = signal(false);
  messageToDelete   = signal<ContactMessage | null>(null);
  deleting          = signal(false);

  filteredMessages = computed(() => {
    let list = this.allMessages();
    const tab    = this.currentTab();
    const search = this.searchTerm().toLowerCase().trim();

    if (tab === 'pendiente') {
      list = list.filter(m => m.estado === MessageStatus.PENDIENTE);
    } else if (tab === 'atendido') {
      list = list.filter(m => m.estado === MessageStatus.ATENDIDO);
    }

    if (search) {
      list = list.filter(m =>
        m.nombre.toLowerCase().includes(search) ||
        (m.email ?? '').toLowerCase().includes(search) ||
        (m.asunto ?? '').toLowerCase().includes(search) ||
        m.mensaje.toLowerCase().includes(search)
      );
    }

    return list;
  });

  tabCounts = computed<Record<MessageTab, number>>(() => {
    const all = this.allMessages();
    return {
      all:       all.length,
      pendiente: all.filter(m => m.estado === MessageStatus.PENDIENTE).length,
      atendido:  all.filter(m => m.estado === MessageStatus.ATENDIDO).length,
    };
  });

  confirmMessage = computed(() => {
    const m = this.messageToDelete();
    if (!m) return '';
    return `¿Estás seguro de eliminar el mensaje de ${m.nombre}? Esta acción no se puede deshacer.`;
  });

  ngOnInit(): void {
    this.loadMessages(false);
  }

  loadMessages(isRefresh: boolean): void {
    if (isRefresh) {
      this.refreshing.set(true);
    } else {
      this.loading.set(true);
    }
    this.errored.set(false);

    this.api.getMessages().subscribe({
      next: (messages) => {
        this.allMessages.set(messages);
        this.loading.set(false);
        this.refreshing.set(false);
        if (isRefresh) {
          this.notify.success('Mensajes actualizados', '');
        }
        this.checkQueryParam();
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        this.refreshing.set(false);
        if (error.status !== 401 && error.status !== 403) {
          this.errored.set(true);
        }
      },
    });
  }

  private checkQueryParam(): void {
    const idStr = this.route.snapshot.queryParams['id'];
    if (!idStr) return;

    const id = Number(idStr);
    if (Number.isNaN(id)) return;

    const msg = this.allMessages().find(m => m.id === id);
    if (msg) {
      this.selectedMessage.set(msg);
      this.modalOpen.set(true);
    }

    this.router.navigate([], { replaceUrl: true, queryParams: {} });
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.table?.resetPage();
  }

  onTabChange(tab: MessageTab): void {
    this.currentTab.set(tab);
    this.table?.resetPage();
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.currentTab.set('all');
    this.table?.resetPage();
  }

  onViewMessage(msg: ContactMessage): void {
    this.selectedMessage.set(msg);
    this.modalOpen.set(false);
    setTimeout(() => this.modalOpen.set(true), 0);
  }

  onModalClose(): void {
    this.modalOpen.set(false);
    this.modalUpdating.set(false);
    setTimeout(() => this.selectedMessage.set(null), 300);
  }

  updateStatus(msg: ContactMessage, fromModal = false): void {
    const newStatus = msg.estado === MessageStatus.PENDIENTE
      ? MessageStatus.ATENDIDO
      : MessageStatus.PENDIENTE;

    this.updatingIds.update(set => {
      const next = new Set(set);
      next.add(msg.id);
      return next;
    });

    if (fromModal) {
      this.modalUpdating.set(true);
    }

    this.api.updateMessageStatus(msg.id, newStatus).subscribe({
      next: (updated) => {
        this.allMessages.update(list =>
          list.map(m => m.id === updated.id ? updated : m)
        );

        if (fromModal) {
          this.selectedMessage.set(updated);
          this.modalUpdating.set(false);
        }

        this.updatingIds.update(set => {
          const next = new Set(set);
          next.delete(msg.id);
          return next;
        });

        const label = newStatus === MessageStatus.ATENDIDO ? 'atendido' : 'pendiente';
        this.notify.success('Estado actualizado', `Mensaje marcado como ${label}`);
      },
      error: (error: HttpErrorResponse) => {
        if (fromModal) this.modalUpdating.set(false);
        this.updatingIds.update(set => {
          const next = new Set(set);
          next.delete(msg.id);
          return next;
        });
        if (error.status !== 401 && error.status !== 403) {
          this.notify.error('No se pudo actualizar', 'Intenta nuevamente en unos momentos');
        }
      },
    });
  }

  onDeleteRequest(msg: ContactMessage): void {
    this.messageToDelete.set(msg);
    this.modalOpen.set(false);
    this.confirmDeleteOpen.set(true);
  }

  onCancelDelete(): void {
    this.confirmDeleteOpen.set(false);
    setTimeout(() => this.messageToDelete.set(null), 300);
  }

  onConfirmDelete(): void {
    const msg = this.messageToDelete();
    if (!msg) return;

    this.deleting.set(true);

    this.api.deleteMessage(msg.id).subscribe({
      next: () => {
        this.allMessages.update(list => list.filter(m => m.id !== msg.id));
        this.deleting.set(false);
        this.confirmDeleteOpen.set(false);
        this.messageToDelete.set(null);
        this.notify.success('Mensaje eliminado', `El mensaje de ${msg.nombre} fue eliminado`);
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
