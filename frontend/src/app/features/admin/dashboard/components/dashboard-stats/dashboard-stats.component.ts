import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  CheckCircle2,
  Clock,
  LucideAngularModule,
  MessageSquare,
  Users,
} from 'lucide-angular';

import { StatCardComponent } from '../../../../../shared/components/widgets/stat-card/stat-card.component';
import { DashboardStats } from '../../../../../core/models/admin/dashboard-stats.model';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, StatCardComponent],
  template: `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <div data-aos="fade-up" data-aos-delay="0">
        <app-stat-card
          label="Total Clientes"
          [value]="stats().totalClientes"
          [icon]="Users"
          color="brand"
          [description]="stats().totalClientes === 1 ? 'cliente registrado' : 'clientes registrados'"
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="100">
        <app-stat-card
          label="Mensajes"
          [value]="stats().totalMensajes"
          [icon]="MessageSquare"
          color="purple"
          [description]="stats().totalMensajes === 1 ? 'mensaje recibido' : 'mensajes recibidos'"
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="200">
        <app-stat-card
          label="Pendientes"
          [value]="stats().mensajesPendientes"
          [icon]="Clock"
          color="warning"
          [description]="pendientesDescription()"
        />
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
        <app-stat-card
          label="Atendidos"
          [value]="stats().mensajesAtendidos"
          [icon]="CheckCircle2"
          color="success"
          [trend]="responseRate()"
          trendDirection="up"
          trendLabel="tasa de respuesta"
        />
      </div>

    </div>
  `,
})
export class DashboardStatsComponent {
  stats = input.required<DashboardStats>();

  readonly Users         = Users;
  readonly MessageSquare = MessageSquare;
  readonly Clock         = Clock;
  readonly CheckCircle2  = CheckCircle2;

  pendientesDescription = computed(() => {
    const p = this.stats().mensajesPendientes;
    if (p === 0) return '¡Todo al día! 🎉';
    if (p === 1) return 'requiere atención';
    return 'requieren atención';
  });

  responseRate = computed(() => {
    const total    = this.stats().totalMensajes;
    const atendidos = this.stats().mensajesAtendidos;
    if (total === 0) return '—';
    return `${Math.round((atendidos / total) * 100)}%`;
  });
}
