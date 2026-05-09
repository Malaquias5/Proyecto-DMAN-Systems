import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, computed,
  input, output
} from '@angular/core';
import {
  LucideAngularModule,
  Phone, Mail, MessageSquare, MessageCircle,
  CheckCircle2, Clock, Trash2, ToggleLeft, ToggleRight
} from 'lucide-angular';

import { ModalComponent } from '../../../../../shared/components/ui/modal/modal.component';
import { FormatDatePipe } from '../../../../../shared/pipes/format-date.pipe';
import { ContactMessage } from '../../../../../core/models/contact/contact-message.model';
import { MessageStatus } from '../../../../../core/enums/message-status.enum';

@Component({
  selector: 'app-message-detail-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LucideAngularModule,
    ModalComponent,
    FormatDatePipe,
  ],
  templateUrl: './message-detail-modal.component.html',
})
export class MessageDetailModalComponent {
  open     = input<boolean>(false);
  message  = input<ContactMessage | null>(null);
  updating = input<boolean>(false);

  closed       = output<void>();
  toggleStatus = output<ContactMessage>();
  deleted      = output<ContactMessage>();

  Phone         = Phone;
  Mail          = Mail;
  MessageSquare = MessageSquare;
  MessageCircle = MessageCircle;
  CheckCircle2  = CheckCircle2;
  Clock         = Clock;
  Trash2        = Trash2;
  ToggleLeft    = ToggleLeft;
  ToggleRight   = ToggleRight;
  MessageStatus = MessageStatus;

  isPendiente = computed(() => this.message()?.estado === MessageStatus.PENDIENTE);

  avatarColor = computed(() => {
    const name = this.message()?.nombre ?? '';
    const colors = [
      'bg-blue-500',    'bg-violet-500',  'bg-pink-500',
      'bg-rose-500',    'bg-orange-500',  'bg-amber-500',
      'bg-emerald-500', 'bg-teal-500',    'bg-cyan-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  });

  initials = computed(() => {
    return (this.message()?.nombre ?? '')
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  });

  whatsappUrl = computed(() => {
    const tel = (this.message()?.telefono ?? '').replace(/\D/g, '');
    return tel ? `https://wa.me/${tel}` : null;
  });

  emailReplyUrl = computed(() => {
    const email = this.message()?.email;
    const asunto = this.message()?.asunto ?? 'Re: consulta';
    return email ? `mailto:${email}?subject=${encodeURIComponent(asunto)}` : null;
  });

  onClose(): void {
    this.closed.emit();
  }

  onToggleStatus(): void {
    const m = this.message();
    if (m) this.toggleStatus.emit(m);
  }

  onDelete(): void {
    const m = this.message();
    if (m) this.deleted.emit(m);
  }
}
