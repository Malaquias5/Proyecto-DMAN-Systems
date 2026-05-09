import { ServiceCategory } from '../../enums/service-category.enum';

/**
 * DTO para crear/actualizar un servicio del catalogo.
 */
export interface ServiceItemRequest {
	nombre: string;
	descripcion?: string;
	categoria?: ServiceCategory | string;
	icono?: string;
	activo?: boolean;
}
