import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Briefcase, Code, LucideAngularModule, Users, Zap } from 'lucide-angular';

interface Stat {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stats-section.component.html',
})
export class StatsSectionComponent {
  readonly stats: Stat[] = [
    {
      icon: Briefcase,
      value: '50+',
      label: 'Proyectos',
      description: 'Entregados con éxito',
    },
    {
      icon: Users,
      value: '40+',
      label: 'Clientes',
      description: 'Confían en nosotros',
    },
    {
      icon: Code,
      value: '15+',
      label: 'Tecnologías',
      description: 'En nuestro stack',
    },
    {
      icon: Zap,
      value: '24/7',
      label: 'Soporte',
      description: 'Cuando lo necesites',
    },
  ];
}
