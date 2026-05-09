import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ArrowRight,
  ExternalLink,
  LucideAngularModule,
  MessageSquare,
  Users,
} from 'lucide-angular';

interface QuickAction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  route?: string;
  href?: string;
  external?: boolean;
}

@Component({
  selector: 'app-dashboard-quick-actions',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <div class="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5">

      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Accesos rápidos
        </h3>
      </div>

      <div class="space-y-2">
        @for (action of actions; track action.title) {

          @if (action.route) {
            <a
              [routerLink]="action.route"
              class="group flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <div [class]="'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ' + action.iconBg">
                <lucide-icon [img]="action.icon" [class]="'w-4 h-4 ' + action.iconColor"></lucide-icon>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{{ action.title }}</p>
                <p class="text-xs text-zinc-500 dark:text-zinc-400 truncate">{{ action.description }}</p>
              </div>
              <lucide-icon
                [img]="ArrowRight"
                class="w-4 h-4 text-zinc-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all"
              ></lucide-icon>
            </a>

          } @else if (action.href) {
            <a
              [href]="action.href"
              [target]="action.external ? '_blank' : '_self'"
              class="group flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              <div [class]="'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ' + action.iconBg">
                <lucide-icon [img]="action.icon" [class]="'w-4 h-4 ' + action.iconColor"></lucide-icon>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{{ action.title }}</p>
                <p class="text-xs text-zinc-500 dark:text-zinc-400 truncate">{{ action.description }}</p>
              </div>
              <lucide-icon
                [img]="ExternalLink"
                class="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-500 transition-colors"
              ></lucide-icon>
            </a>
          }

        }
      </div>
    </div>
  `,
})
export class DashboardQuickActionsComponent {
  readonly ArrowRight   = ArrowRight;
  readonly ExternalLink = ExternalLink;

  readonly actions: QuickAction[] = [
    {
      icon: MessageSquare,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-500/10',
      title: 'Mensajes pendientes',
      description: 'Revisar consultas sin atender',
      route: '/admin/mensajes',
    },
    {
      icon: Users,
      iconColor: 'text-brand-500',
      iconBg: 'bg-brand-500/10',
      title: 'Lista de clientes',
      description: 'Ver todos los leads',
      route: '/admin/clientes',
    },
    {
      icon: ExternalLink,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
      title: 'Sitio público',
      description: 'Ver el sitio como visitante',
      href: '/',
      external: false,
    },
  ];
}
