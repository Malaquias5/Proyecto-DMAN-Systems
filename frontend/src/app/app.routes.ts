import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/public/home/home.component').then((m) => m.HomeComponent),
        title: 'DMAN Systems - Soluciones Tecnológicas',
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./features/public/contact/contact.component').then((m) => m.ContactComponent),
        title: 'Contacto - DMAN Systems',
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./features/public/services/services.component').then((m) => m.ServicesComponent),
        title: 'Servicios - DMAN Systems',
      },
      { path: 'catalogo', redirectTo: 'servicios', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
        title: 'Iniciar sesión | DMAN Systems',
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes),
  },
  { path: '**', redirectTo: '' },
];
