import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { APP_CONFIG } from '@core/constants/app.constants';

interface SeoConfig {
	title?: string;
	description?: string;
	image?: string;
	url?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
	private readonly title = inject(Title);
	private readonly meta = inject(Meta);

	setMetaTags(config: SeoConfig): void {
		const fullTitle = config.title ? `${config.title} | ${APP_CONFIG.name}` : APP_CONFIG.fullName;
		const description = config.description ?? APP_CONFIG.description;

		this.title.setTitle(fullTitle);
		this.meta.updateTag({ name: 'description', content: description });

		this.meta.updateTag({ property: 'og:title', content: fullTitle });
		this.meta.updateTag({ property: 'og:description', content: description });
		if (config.image) {
			this.meta.updateTag({ property: 'og:image', content: config.image });
		}
		if (config.url) {
			this.meta.updateTag({ property: 'og:url', content: config.url });
		}

		this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
		this.meta.updateTag({ name: 'twitter:description', content: description });
	}

	reset(): void {
		this.title.setTitle(APP_CONFIG.fullName);
		this.meta.updateTag({ name: 'description', content: APP_CONFIG.description });
	}
}
