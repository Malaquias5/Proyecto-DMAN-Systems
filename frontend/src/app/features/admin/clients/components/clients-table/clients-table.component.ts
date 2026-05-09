import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import {
  LucideAngularModule,
  Eye,
  Trash2,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Globe,
  Smartphone,
  ShoppingCart,
  Bot,
  Ellipsis,
} from 'lucide-angular';

import { TimeAgoPipe } from '../../../../../shared/pipes/time-ago.pipe';
import { InitialsPipe } from '../../../../../shared/pipes/initials.pipe';
import { FormatDatePipe } from '../../../../../shared/pipes/format-date.pipe';
import { Client } from '../../../../../core/models';

interface ServiceBadge {
  icon: any;
  label: string;
  color: string;
  bg: string;
}

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    TimeAgoPipe,
    InitialsPipe,
    FormatDatePipe,
  ],
  templateUrl: './clients-table.component.html',
})
export class ClientsTableComponent {
  clients = input.required<Client[]>();
  pageSize = input<number>(10);

  view   = output<Client>();
  delete = output<Client>();

  Eye = Eye;
  Trash2 = Trash2;
  Mail = Mail;
  Phone = Phone;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;

  // Estado de paginación
  currentPage = signal(1);

  // Computed: páginas y datos paginados
  totalPages = computed(() => {
    const total = this.clients().length;
    const size = this.pageSize();
    return Math.max(1, Math.ceil(total / size));
  });

  paginatedClients = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.clients().slice(start, start + this.pageSize());
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];
    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push('...');
    pages.push(total);
    return pages;
  });

  rangeText = computed(() => {
    const total = this.clients().length;
    if (total === 0) return '0 resultados';

    const start = (this.currentPage() - 1) * this.pageSize() + 1;
    const end = Math.min(start + this.pageSize() - 1, total);
    return `${start}-${end} de ${total}`;
  });

  avatarColors = ['bg-brand-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-cyan-500'];

  // Configuración de badges por servicio
  private readonly serviceBadges: Record<string, ServiceBadge> = {
    web:    { icon: Globe,        label: 'Web',     color: 'text-brand-500',  bg: 'bg-brand-500/10'  },
    app:    { icon: Smartphone,   label: 'App',     color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ventas: { icon: ShoppingCart, label: 'Ventas',  color: 'text-green-500',  bg: 'bg-green-500/10'  },
    bot:    { icon: Bot,          label: 'Bot',     color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    otro:   { icon: Ellipsis,     label: 'Otro',    color: 'text-zinc-500',   bg: 'bg-zinc-500/10'   },
  };

  getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (name.codePointAt(i) ?? 0) + ((hash << 5) - hash);
    }
    return this.avatarColors[Math.abs(hash) % this.avatarColors.length];
  }

  getServiceBadge(servicio: string | undefined): ServiceBadge | null {
    if (!servicio) return null;
    return this.serviceBadges[servicio] ?? this.serviceBadges['otro'];
  }

  goToPage(page: number | '...'): void {
    if (page === '...' || page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  resetPage(): void {
    this.currentPage.set(1);
  }

  onView(client: Client): void {
    this.view.emit(client);
  }

  onDelete(client: Client, event: Event): void {
    event.stopPropagation();
    this.delete.emit(client);
  }
}
