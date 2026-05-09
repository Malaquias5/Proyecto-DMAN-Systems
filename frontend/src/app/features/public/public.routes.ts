import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contacto'
  },
  {
    path: 'contacto',
    loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent)
  }
];
