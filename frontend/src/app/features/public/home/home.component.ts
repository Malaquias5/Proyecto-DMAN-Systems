import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../core/services/utils/seo.service';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { TrustedBySectionComponent } from './components/trusted-by-section/trusted-by-section.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { ProcessSectionComponent } from './components/process-section/process-section.component';
import { StatsSectionComponent } from './components/stats-section/stats-section.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    TrustedBySectionComponent,
    ServicesSectionComponent,
    TestimonialsSectionComponent,
    ProcessSectionComponent,
    StatsSectionComponent,
    CtaSectionComponent,
  ],
  template: `
    <app-hero-section />
    <app-trusted-by-section />
    <app-services-section />
    <app-process-section />
    <app-testimonials-section />
    <app-stats-section />
    <app-cta-section />
  `,
})
export class HomeComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setMetaTags({
      title: 'Inicio',
      description: 'DMAN Systems: páginas web, aplicaciones móviles, sistemas de ventas y bots automatizados. Construimos productos digitales que escalan.',
    });
  }
}
