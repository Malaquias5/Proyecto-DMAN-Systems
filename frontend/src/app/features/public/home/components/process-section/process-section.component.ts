import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './process-section.component.html',
})
export class ProcessSectionComponent {
  readonly steps: ProcessStep[] = [
    {
      number: '1',
      title: 'Reunión inicial',
      description: 'Conversamos sobre tu idea, objetivos y necesidades. Te asesoramos sin compromiso para encontrar la mejor solución para tu caso.',
      isHighlighted: true,
    },
    {
      number: '2',
      title: 'Propuesta y diseño',
      description: 'Te presentamos una propuesta detallada con tiempos, costos y los primeros mockups del diseño visual.',
    },
    {
      number: '3',
      title: 'Desarrollo iterativo',
      description: 'Construimos tu producto con metodologías ágiles. Tendrás acceso a avances semanales para ajustar lo que necesites.',
    },
    {
      number: '4',
      title: 'Lanzamiento y soporte',
      description: 'Desplegamos tu producto y te brindamos soporte continuo. Estamos contigo siempre que nos necesites.',
    },
  ];
}
