/**
 * DTO para crear un cliente nuevo.
 */
export interface ClientRequest {
	nombre: string;
	telefono: string;
	email?: string;
	servicio?: string;
	mensaje?: string;
}
