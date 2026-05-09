import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AdminSidebarComponent } from '../../../../shared/components/layout/admin-sidebar/admin-sidebar.component';
import { AdminTopbarComponent } from '../../../../shared/components/layout/admin-topbar/admin-topbar.component';

@Component({
	selector: 'app-admin-layout',
	standalone: true,
	imports: [CommonModule, RouterOutlet, AdminSidebarComponent, AdminTopbarComponent],
	template: `
		<div class="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr] bg-zinc-950 text-zinc-100">
			<app-admin-sidebar />

			<div class="min-h-screen grid grid-rows-[auto_1fr]">
				<app-admin-topbar />
				<main class="p-4 md:p-6">
					<router-outlet></router-outlet>
				</main>
			</div>
		</div>
	`,
})
export class AdminLayoutComponent {}
