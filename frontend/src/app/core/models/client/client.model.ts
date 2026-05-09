/**
 * Cliente/Lead registrado en el sistema.
 */
export interface Client {
	id: number;
	nombre: string;
	telefono: string;
	email?: string;
	servicio?: string;
	mensaje?: string;
	fechaRegistro: string;
}
