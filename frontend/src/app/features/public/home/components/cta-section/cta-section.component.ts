import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule, MessageCircle } from 'lucide-angular';

import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    ButtonComponent,
  ],
  templateUrl: './cta-section.component.html',
})
export class CtaSectionComponent {
  readonly ArrowRight = ArrowRight;
  readonly MessageCircle = MessageCircle;

  readonly whatsappUrl = `https://wa.me/${environment.whatsappPhone}?text=${encodeURIComponent('Hola DMAN Systems, me interesa cotizar un proyecto')}`;
}
