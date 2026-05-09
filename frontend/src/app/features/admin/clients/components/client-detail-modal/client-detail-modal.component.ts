import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import {
  LucideAngularModule,
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Trash2,
  Send,
  ExternalLink,
} from 'lucide-angular';

import { ModalComponent } from '../../../../../shared/components/ui/modal/modal.component';
import { ButtonComponent } from '../../../../../shared/components/ui/button/button.component';
import { InitialsPipe } from '../../../../../shared/pipes/initials.pipe';
import { FormatDatePipe } from '../../../../../shared/pipes/format-date.pipe';
import { Client } from '../../../../../core/models';

@Component({
  selector: 'app-client-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ModalComponent,
    ButtonComponent,
    InitialsPipe,
    FormatDatePipe,
  ],
  template: `
    <app-modal
      [open]="open()"
      [showHeader]="false"
      size="lg"
      (closed)="onClose()"
    >
      @if (client(); as c) {
        <div>

          <div class="flex items-center gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800">
            <div [class]="'w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ' + avatarColor()">
              {{ c.nombre | initials }}
            </div>

            <div class="flex-1 min-w-0">
              <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {{ c.nombre }}
              </h2>
              <p class="text-xs text-zinc-500 dark:text-zinc-500 inline-flex items-center gap-1">
                <lucide-icon [img]="Calendar" class="w-3 h-3"></lucide-icon>
                Cliente desde {{ c.fechaRegistro | formatDate:'date-only' }}
              </p>
            </div>
          </div>

          <div class="py-5 space-y-3">

            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                <lucide-icon [img]="Phone" class="w-4 h-4 text-brand-500"></lucide-icon>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
                  Teléfono
                </p>
                
                <a
                  [href]="'tel:' + c.telefono"
                  class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-brand-500 transition-colors"
                >
                  {{ c.telefono }}
                </a>
              </div>
              
              <a
                [href]="whatsappUrl()"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs font-medium text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1"
              >
                WhatsApp
                <lucide-icon [img]="ExternalLink" class="w-3 h-3"></lucide-icon>
              </a>
            </div>

            @if (c.email) {
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <lucide-icon [img]="Mail" class="w-4 h-4 text-purple-500"></lucide-icon>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
                    Email
                  </p>
                  
                  <a
                    [href]="'mailto:' + c.email"
                    class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-brand-500 transition-colors break-all"
                  >
                    {{ c.email }}
                  </a>
                </div>
              </div>
            }

            @if (c.servicio) {
              <div class="flex items-start gap-3">
                <div class="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                  <lucide-icon [img]="MessageSquare" class="w-4 h-4 text-yellow-500"></lucide-icon>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-0.5">
                    Servicio de interés
                  </p>
                  <p class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 capitalize">
                    {{ servicioLabel() }}
                  </p>
                </div>
              </div>
            }
          </div>

          @if (c.mensaje) {
            <div class="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-4 mb-5">
              <p class="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Mensaje original
              </p>
              <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {{ c.mensaje }}
              </p>
            </div>
          }

          <div class="flex flex-col sm:flex-row gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            
            <a
              [href]="whatsappUrl()"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-all duration-200 active:scale-[0.98] flex-1"
            >
              <lucide-icon [img]="Send" class="w-4 h-4"></lucide-icon>
              Contactar por WhatsApp
            </a>

            <app-button
              variant="danger"
              [iconLeft]="Trash2"
              (clicked)="onDelete()"
            >
              Eliminar
            </app-button>
          </div>
        </div>
      }
    </app-modal>
  `,
})
export class ClientDetailModalComponent {
  open   = input<boolean>(false);
  client = input<Client | null>(null);

  closed  = output<void>();
  deleted = output<Client>();

  Mail = Mail;
  Phone = Phone;
  Calendar = Calendar;
  MessageSquare = MessageSquare;
  Trash2 = Trash2;
  Send = Send;
  ExternalLink = ExternalLink;

  private readonly avatarColors = ['bg-brand-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-cyan-500'];

  private readonly servicioLabels: Record<string, string> = {
    web:    'Página web',
    app:    'Aplicación móvil',
    ventas: 'Sistema de ventas',
    bot:    'Bot automatizado',
    otro:   'Otro',
  };

  avatarColor = computed(() => {
    const name = this.client()?.nombre ?? '';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (name.codePointAt(i) ?? 0) + ((hash << 5) - hash);
    }
    return this.avatarColors[Math.abs(hash) % this.avatarColors.length];
  });

  servicioLabel = computed(() => {
    const s = this.client()?.servicio ?? '';
    return this.servicioLabels[s] ?? s;
  });

  whatsappUrl = computed(() => {
    const c = this.client();
    if (!c) return '#';

    let phone = c.telefono.replaceAll(/[\s\-()]/g, '');
    if (!phone.startsWith('+') && !phone.startsWith('51')) {
      phone = '51' + phone;
    }
    phone = phone.replace('+', '');

    const message = `Hola ${c.nombre}, soy de DMAN Systems. Recibimos tu consulta y nos gustaría conversar sobre tu proyecto.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });

  onClose(): void {
    this.closed.emit();
  }

  onDelete(): void {
    const c = this.client();
    if (c) this.deleted.emit(c);
  }
}
