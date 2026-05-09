import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layouts/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'dashboard',
			},
			{
				path: 'dashboard',
				loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
				title: 'Dashboard Admin - DMAN',
			},
			{
				path: 'clientes',
				loadComponent: () => import('./clients/clients.component').then((m) => m.ClientsComponent),
				title: 'Clientes Admin - DMAN',
			},
			{
				path: 'mensajes',
				loadComponent: () => import('./messages/messages.component').then((m) => m.MessagesComponent),
				title: 'Mensajes Admin - DMAN',
			},
		],
	},
];
