import { ServiceCategory } from '../../enums/service-category.enum';

/**
 * Servicio del catalogo de DMAN.
 */
export interface ServiceItem {
	id: number;
	nombre: string;
	descripcion: string;
	categoria: ServiceCategory | string;
	icono: string;
	activo: boolean;
}
