import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, computed,
  input, output, signal
} from '@angular/core';
import {
  LucideAngularModule,
  Eye, Trash2, ChevronLeft, ChevronRight,
  ToggleLeft, ToggleRight
} from 'lucide-angular';

import { FormatDatePipe } from '../../../../../shared/pipes/format-date.pipe';
import { ContactMessage } from '../../../../../core/models/contact/contact-message.model';
import { MessageStatus } from '../../../../../core/enums/message-status.enum';

@Component({
  selector: 'app-messages-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormatDatePipe,
  ],
  templateUrl: './messages-table.component.html',
})
export class MessagesTableComponent {
  messages    = input.required<ContactMessage[]>();
  pageSize    = input<number>(10);
  updatingIds = input<Set<number>>(new Set());

  view         = output<ContactMessage>();
  delete       = output<ContactMessage>();
  toggleStatus = output<ContactMessage>();

  Eye          = Eye;
  Trash2       = Trash2;
  ChevronLeft  = ChevronLeft;
  ChevronRight = ChevronRight;
  ToggleLeft   = ToggleLeft;
  ToggleRight  = ToggleRight;
  MessageStatus = MessageStatus;

  currentPage = signal(1);

  totalPages = computed(() =>
    Math.ceil(this.messages().length / this.pageSize())
  );

  pagedMessages = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.messages().slice(start, start + this.pageSize());
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const current = this.currentPage();
    const pages: (number | '...')[] = [1];

    if (current > 3)            pages.push('...');
    if (current > 2)            pages.push(current - 1);
    if (current !== 1 && current !== total) pages.push(current);
    if (current < total - 1)    pages.push(current + 1);
    if (current < total - 2)    pages.push('...');
    pages.push(total);

    return pages;
  });

  resetPage(): void {
    this.currentPage.set(1);
  }

  goToPage(n: number): void {
    if (n >= 1 && n <= this.totalPages()) {
      this.currentPage.set(n);
    }
  }

  isPendiente(m: ContactMessage): boolean {
    return m.estado === MessageStatus.PENDIENTE;
  }

  isUpdating(m: ContactMessage): boolean {
    return this.updatingIds().has(m.id);
  }

  getAvatarColor(name: string): string {
    const colors = [
      'bg-blue-500',    'bg-violet-500',  'bg-pink-500',
      'bg-rose-500',    'bg-orange-500',  'bg-amber-500',
      'bg-emerald-500', 'bg-teal-500',    'bg-cyan-500',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (name.codePointAt(i) ?? 0) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}
