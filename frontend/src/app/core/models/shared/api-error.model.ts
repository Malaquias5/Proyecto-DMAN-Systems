/**
 * Estructura estandar de error que devuelve el backend.
 */
export interface ApiError {
	timestamp: string;
	status: number;
	error: string;
	message?: string;
	errors?: Record<string, string>;
	path?: string;
}
