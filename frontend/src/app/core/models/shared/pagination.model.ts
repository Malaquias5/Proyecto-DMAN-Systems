/**
 * Estructura generica para respuestas paginadas.
 */
export interface Page<T> {
	content: T[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	first: boolean;
	last: boolean;
	empty: boolean;
}

/**
 * Parametros de paginacion para requests.
 */
export interface PageRequest {
	page?: number;
	size?: number;
	sort?: string;
}
