import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from '../../shared/components/layout/footer/footer.component';
import { NavbarComponent } from '../../shared/components/layout/navbar/navbar.component';
import { WhatsappButtonComponent } from '../../shared/components/widgets/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent],
  template: `
    <div class="min-h-screen bg-surface-base text-content-primary">
      <app-navbar />
      <main class="pt-20">
        <router-outlet></router-outlet>
      </main>
      <app-footer />
      <app-whatsapp-button />
    </div>
  `,
})
export class PublicLayoutComponent {}
