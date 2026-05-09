import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Clock,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
} from 'lucide-angular';

import { APP_CONFIG } from '../../../../../core/constants/app.constants';
import { environment } from '../../../../../../environments/environment';

interface ContactItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex flex-col gap-3" data-aos="fade-up">

      @for (item of items; track item.label; let i = $index) {
        <a
          [href]="item.href ?? null"
          [target]="item.external ? '_blank' : '_self'"
          [rel]="item.external ? 'noopener noreferrer' : null"
          class="block group"
          [attr.data-aos]="'fade-up'"
          [attr.data-aos-delay]="i * 80"
        >
          <div class="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500/30 transition-all duration-200 group-hover:shadow-md">

            <div [class]="'w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ' + item.iconBg">
              <lucide-icon
                [img]="item.icon"
                [class]="'w-5 h-5 ' + item.iconColor"
              ></lucide-icon>
            </div>

            <div class="flex-1 min-w-0">
              <div class="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500 mb-0.5">
                {{ item.label }}
              </div>
              <div class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-500 transition-colors truncate">
                {{ item.value }}
              </div>
            </div>
          </div>
        </a>
      }

      <!-- Disponible ahora -->
      <div
        class="mt-2 p-4 rounded-xl bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20"
        data-aos="fade-up"
        data-aos-delay="320"
      >
        <div class="flex items-center gap-2 mb-2">
          <span class="relative flex w-2 h-2">
            <span class="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-50 animate-ping"></span>
            <span class="relative inline-flex rounded-full w-2 h-2 bg-green-500"></span>
          </span>
          <span class="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400">
            Estamos disponibles
          </span>
        </div>
        <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Respondemos todos los mensajes en menos de 24 horas hábiles.
          Para consultas urgentes, contáctanos por WhatsApp.
        </p>
      </div>

      <!-- Horario -->
      <div
        class="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
        data-aos="fade-up"
        data-aos-delay="380"
      >
        <div class="flex items-center gap-2 mb-3">
          <lucide-icon [img]="Clock" class="w-4 h-4 text-zinc-500"></lucide-icon>
          <span class="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Horario de atención
          </span>
        </div>
        <ul class="space-y-1.5 text-xs">
          <li class="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
            <span>Lunes a Viernes</span>
            <span class="font-semibold text-zinc-900 dark:text-zinc-100">9am - 7pm</span>
          </li>
          <li class="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
            <span>Sábados</span>
            <span class="font-semibold text-zinc-900 dark:text-zinc-100">10am - 2pm</span>
          </li>
          <li class="flex items-center justify-between text-zinc-500 dark:text-zinc-500">
            <span>Domingos</span>
            <span>Cerrado</span>
          </li>
        </ul>
      </div>

    </div>
  `,
})
export class ContactInfoComponent {
  readonly Clock = Clock;

  readonly items: ContactItem[] = [
    {
      icon: Mail,
      iconColor: 'text-brand-500',
      iconBg: 'bg-brand-500/10',
      label: 'Email',
      value: APP_CONFIG.contact.email,
      href: `mailto:${APP_CONFIG.contact.email}`,
    },
    {
      icon: Phone,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-500/10',
      label: 'WhatsApp',
      value: APP_CONFIG.contact.phone,
      href: `https://wa.me/${environment.whatsappPhone}?text=${encodeURIComponent('Hola DMAN Systems, me interesa cotizar un proyecto')}`,
      external: true,
    },
    {
      icon: MapPin,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10',
      label: 'Ubicación',
      value: APP_CONFIG.contact.address,
    },
  ];
}
