import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { ToastContainerComponent } from './shared/components/ui/toast/toast-container.component';
import { LoadingBarComponent } from './shared/components/ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent, LoadingBarComponent],
  template: `
    <app-loading-bar />
    <router-outlet />
    <app-toast-container />
  `,
})
export class App implements OnInit {
  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: 'phone',
    });
  }
}
