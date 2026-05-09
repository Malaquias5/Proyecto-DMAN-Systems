/**
 * Respuesta del backend al hacer login/register.
 */
export interface AuthResponse {
	token: string;
	username: string;
	role: string;
	expiresIn: number;
}
