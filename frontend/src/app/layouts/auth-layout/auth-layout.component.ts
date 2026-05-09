import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-auth-layout',
	standalone: true,
	imports: [RouterOutlet],
	template: `
		<section class="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_28%),linear-gradient(180deg,#060816_0%,#0b1020_50%,#05070f_100%)] px-4 py-10 text-white">
			<div class="pointer-events-none absolute inset-0">
				<div class="absolute left-[8%] top-[12%] h-60 w-60 rounded-full bg-brand-500/18 blur-3xl"></div>
				<div class="absolute bottom-[10%] right-[8%] h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl"></div>
			</div>

			<div class="relative">
				<router-outlet></router-outlet>
			</div>
		</section>
	`,
})
export class AuthLayoutComponent {}
