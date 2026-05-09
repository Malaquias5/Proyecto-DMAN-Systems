import { UserRole } from '../../enums/user-role.enum';

/**
 * Usuario autenticado en sesion.
 */
export interface User {
	username: string;
	role: UserRole | string;
}

/**
 * Estructura del payload decodificado del JWT.
 */
export interface JwtPayload {
	sub: string;
	role: string;
	iat: number;
	exp: number;
}
