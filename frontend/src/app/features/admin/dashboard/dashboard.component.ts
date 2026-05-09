import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardStatsComponent } from './components/dashboard-stats/dashboard-stats.component';
import { DashboardRecentMessagesComponent } from './components/dashboard-recent-messages/dashboard-recent-messages.component';
import { DashboardQuickActionsComponent } from './components/dashboard-quick-actions/dashboard-quick-actions.component';

import { SpinnerComponent } from '../../../shared/components/ui/spinner/spinner.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { EmptyStateComponent } from '../../../shared/components/ui/empty-state/empty-state.component';

import { AdminApiService } from '../../../core/services/api/admin-api.service';
import { DashboardStats } from '../../../core/models/admin/dashboard-stats.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    DashboardStatsComponent,
    DashboardRecentMessagesComponent,
    DashboardQuickActionsComponent,
    SpinnerComponent,
    ButtonComponent,
    EmptyStateComponent,
  ],
  template: `
    <app-dashboard-header />

    @if (loading()) {
      <div class="flex flex-col items-center justify-center py-24">
        <app-spinner size="lg" />
        <p class="text-sm text-zinc-500 mt-4">Cargando dashboard...</p>
      </div>
    } @else if (errored()) {
      <app-empty-state
        title="No pudimos cargar el dashboard"
        description="Verifica que el backend esté corriendo correctamente."
      >
        <app-button variant="primary" (clicked)="loadDashboard()">
          Reintentar
        </app-button>
      </app-empty-state>
    } @else if (stats(); as currentStats) {

      <app-dashboard-stats [stats]="currentStats" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2" data-aos="fade-up">
          <app-dashboard-recent-messages />
        </div>
        <div class="lg:col-span-1" data-aos="fade-up" data-aos-delay="100">
          <app-dashboard-quick-actions />
        </div>
      </div>
    }
  `,
})
export class DashboardComponent implements OnInit {
  private readonly api = inject(AdminApiService);

  readonly loading = signal(true);
  readonly errored = signal(false);
  readonly stats   = signal<DashboardStats | null>(null);

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading.set(true);
    this.errored.set(false);

    this.api.getDashboard().subscribe({
      next: (s) => {
        this.stats.set(s);
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
}
