import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContactHeroComponent } from './components/contact-hero/contact-hero.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { SeoService } from '../../../core/services/utils/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ContactHeroComponent,
    ContactInfoComponent,
    ContactFormComponent,
  ],
  template: `
    <app-contact-hero />

    <section class="pb-24">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">

          <div class="lg:col-span-2">
            <app-contact-info />
          </div>

          <div class="lg:col-span-3">
            <app-contact-form [preselectedService]="preselectedService()" />
          </div>

        </div>
      </div>
    </section>
  `,
})
export class ContactComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo   = inject(SeoService);

  readonly preselectedService = signal<string>('');

  ngOnInit(): void {
    this.seo.setMetaTags({
      title: 'Contacto',
      description: 'Conversemos sobre tu proyecto. Páginas web, apps móviles, sistemas de ventas y bots a la medida de tu negocio.',
    });

    const servicio = this.route.snapshot.queryParams['servicio'];
    if (servicio) {
      this.preselectedService.set(servicio);
    }
  }
}
