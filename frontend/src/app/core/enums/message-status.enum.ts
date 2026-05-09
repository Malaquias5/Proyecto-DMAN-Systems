/**
 * Estados posibles de un mensaje de contacto.
 * Coincide con el enum del backend (contact-service).
 */
export enum MessageStatus {
	PENDIENTE = 'PENDIENTE',
	ATENDIDO = 'ATENDIDO',
}

/**
 * Helper para iterar los estados (util en selects).
 */
export const MESSAGE_STATUS_OPTIONS = [
	{ value: MessageStatus.PENDIENTE, label: 'Pendiente' },
	{ value: MessageStatus.ATENDIDO, label: 'Atendido' },
] as const;
