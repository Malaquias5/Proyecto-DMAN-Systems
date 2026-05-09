/**
 * Categorias de servicios que ofrece DMAN Systems.
 * Coincide con el campo "categoria" del backend (service-catalog).
 */
export enum ServiceCategory {
	WEB = 'web',
	APP = 'app',
	VENTAS = 'ventas',
	BOT = 'bot',
}

export const SERVICE_CATEGORY_OPTIONS = [
	{ value: ServiceCategory.WEB, label: 'Paginas Web', icon: 'globe' },
	{ value: ServiceCategory.APP, label: 'Aplicaciones Moviles', icon: 'smartphone' },
	{ value: ServiceCategory.VENTAS, label: 'Sistemas de Ventas', icon: 'shopping-cart' },
	{ value: ServiceCategory.BOT, label: 'Bots Automatizados', icon: 'bot' },
] as const;
