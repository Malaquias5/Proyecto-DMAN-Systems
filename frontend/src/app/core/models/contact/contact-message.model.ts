import { MessageStatus } from '../../enums/message-status.enum';

/**
 * Mensaje del formulario de contacto.
 */
export interface ContactMessage {
  id: number;
  nombre: string;
  email?: string;
  telefono?: string;
  asunto?: string;
  mensaje: string;
  estado: MessageStatus;
  fechaEnvio: string;
  fechaAtencion?: string;
}
