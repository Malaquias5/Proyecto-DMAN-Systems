import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-angular';

import { APP_CONFIG } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  template: `
    <footer class="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div class="container-custom py-16">

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          <div class="lg:col-span-2">
            <div class="flex items-center gap-3 mb-5">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center"
                style="background: linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #8B5CF6 100%); box-shadow: 0 0 20px rgba(99,102,241,0.4);"
              >
                <span class="text-white font-black text-lg">D</span>
              </div>
              <h3 class="text-xl font-black tracking-tight">{{ appName }}</h3>
            </div>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-sm">
              {{ tagline }}. Construimos productos digitales que escalan con tu negocio.
            </p>

            <div class="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <a [href]="'mailto:' + email" class="flex items-center gap-2 hover:text-brand-500 transition-colors">
                <lucide-icon [img]="MailIcon" class="w-4 h-4"></lucide-icon>
                <span>{{ email }}</span>
              </a>
              <div class="flex items-center gap-2">
                <lucide-icon [img]="PhoneIcon" class="w-4 h-4"></lucide-icon>
                <span>{{ phone }}</span>
              </div>
              <div class="flex items-center gap-2">
                <lucide-icon [img]="MapPinIcon" class="w-4 h-4"></lucide-icon>
                <span>{{ address }}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider mb-4 text-zinc-900 dark:text-zinc-200">Navegación</h4>
            <div class="flex flex-col gap-3 text-sm">
              <a routerLink="/" class="text-zinc-600 dark:text-zinc-400 hover:text-brand-500 transition-colors">Inicio</a>
              <a routerLink="/servicios" class="text-zinc-600 dark:text-zinc-400 hover:text-brand-500 transition-colors">Servicios</a>
              <a routerLink="/contacto" class="text-zinc-600 dark:text-zinc-400 hover:text-brand-500 transition-colors">Contacto</a>
            </div>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider mb-4 text-zinc-900 dark:text-zinc-200">Servicios</h4>
            <div class="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Páginas Web</span>
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Apps Móviles</span>
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Sistemas POS</span>
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Bots & Automatización</span>
            </div>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider mb-4 text-zinc-900 dark:text-zinc-200">Empresa</h4>
            <div class="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Sobre nosotros</span>
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Proyectos</span>
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Blog</span>
              <span class="hover:text-brand-500 transition-colors cursor-pointer">Términos</span>
            </div>
          </div>

        </div>

        <div class="mt-14 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p class="text-xs text-zinc-500">
            © {{ year }} {{ appName }}. Todos los derechos reservados.
          </p>

          <div class="flex items-center gap-2">
            @if (showFacebook) {
              <a [href]="facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-brand-500 hover:border-brand-500 transition-colors">
                <lucide-icon [img]="FacebookIcon" class="w-4 h-4"></lucide-icon>
              </a>
            }
            @if (showInstagram) {
              <a [href]="instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-brand-500 hover:border-brand-500 transition-colors">
                <lucide-icon [img]="InstagramIcon" class="w-4 h-4"></lucide-icon>
              </a>
            }
            @if (showLinkedin) {
              <a [href]="linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-brand-500 hover:border-brand-500 transition-colors">
                <lucide-icon [img]="LinkedinIcon" class="w-4 h-4"></lucide-icon>
              </a>
            }
          </div>
        </div>

      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly appName: string = APP_CONFIG.name;
  readonly tagline: string = APP_CONFIG.tagline;
  readonly email: string = APP_CONFIG.contact.email;
  readonly phone: string = APP_CONFIG.contact.phone;
  readonly address: string = APP_CONFIG.contact.address;
  readonly facebook: string = APP_CONFIG.social.facebook;
  readonly instagram: string = APP_CONFIG.social.instagram;
  readonly linkedin: string = APP_CONFIG.social.linkedin;

  readonly showFacebook: boolean = this.facebook !== '#' && this.facebook !== '';
  readonly showInstagram: boolean = this.instagram !== '#' && this.instagram !== '';
  readonly showLinkedin: boolean = this.linkedin !== '#' && this.linkedin !== '';

  readonly FacebookIcon = Facebook;
  readonly InstagramIcon = Instagram;
  readonly LinkedinIcon = Linkedin;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly MapPinIcon = MapPin;
}