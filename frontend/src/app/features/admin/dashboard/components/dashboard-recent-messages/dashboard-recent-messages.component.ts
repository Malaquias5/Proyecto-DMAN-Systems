import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ArrowRight,
  Check,
  Clock,
  Eye,
  LucideAngularModule,
  Mail,
  MessageSquare,
  Phone,
} from 'lucide-angular';

import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { BadgeComponent } from '../../../../../shared/components/ui/badge/badge.component';
import { SpinnerComponent } from '../../../../../shared/components/ui/spinner/spinner.component';
import { EmptyStateComponent } from '../../../../../shared/components/ui/empty-state/empty-state.component';
import { TimeAgoPipe } from '../../../../../shared/pipes/time-ago.pipe';
import { InitialsPipe } from '../../../../../shared/pipes/initials.pipe';

import { AdminApiService } from '../../../../../core/services/api/admin-api.service';
import { NotificationService } from '../../../../../core/services/utils/notification.service';
import { ContactMessage } from '../../../../../core/models/contact/contact-message.model';
import { MessageStatus } from '../../../../../core/enums/message-status.enum';

@Component({
  selector: 'app-dashboard-recent-messages',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    ButtonComponent,
    BadgeComponent,
    SpinnerComponent,
    EmptyStateComponent,
    TimeAgoPipe,
    InitialsPipe,
  ],
  templateUrl: './dashboard-recent-messages.component.html',
})
export class DashboardRecentMessagesComponent implements OnInit {
  private readonly api    = inject(AdminApiService);
  private readonly notify = inject(NotificationService);

  readonly Check        = Check;
  readonly Eye          = Eye;
  readonly MessageSquare = MessageSquare;
  readonly ArrowRight   = ArrowRight;
  readonly Clock        = Clock;
  readonly Mail         = Mail;
  readonly Phone        = Phone;

  readonly MessageStatus = MessageStatus;

  readonly loading      = signal(true);
  readonly errored      = signal(false);
  readonly messages     = signal<ContactMessage[]>([]);
  readonly updatingIds  = signal<Set<number>>(new Set());

  readonly recentMessages = computed(() => this.messages().slice(0, 5));

  private readonly avatarColors = [
    'bg-brand-500', 'bg-purple-500', 'bg-green-500',
    'bg-yellow-500', 'bg-pink-500', 'bg-cyan-500',
  ];

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading.set(true);
    this.errored.set(false);

    this.api.getMessages().subscribe({
      next: (msgs) => {
        this.messages.set(msgs);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errored.set(true);
      },
    });
  }

  getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.avatarColors[Math.abs(hash) % this.avatarColors.length];
  }

  isUpdating(id: number): boolean {
    return this.updatingIds().has(id);
  }

  markAsAttended(message: ContactMessage, event: Event): void {
    event.stopPropagation();
    if (message.estado === MessageStatus.ATENDIDO) return;

    this.updatingIds.update(ids => new Set(ids).add(message.id));

    this.api.updateMessageStatus(message.id, MessageStatus.ATENDIDO).subscribe({
      next: (updated) => {
        this.messages.update(msgs => msgs.map(m => m.id === updated.id ? updated : m));
        this.notify.success('Mensaje atendido', `Mensaje de ${message.nombre} actualizado`);
        this.removeFromUpdating(message.id);
      },
      error: (error: HttpErrorResponse) => {
        this.removeFromUpdating(message.id);
        if (error.status !== 401 && error.status !== 403) {
          this.notify.error('No se pudo actualizar', 'Intenta nuevamente en unos momentos');
        }
      },
    });
  }

  private removeFromUpdating(id: number): void {
    this.updatingIds.update(ids => {
      const s = new Set(ids);
      s.delete(id);
      return s;
    });
  }
}
