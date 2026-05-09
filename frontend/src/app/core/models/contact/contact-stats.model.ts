/**
 * Estadisticas de mensajes (endpoint /api/contacto/stats).
 */
export interface ContactStats {
  total: number;
  pendientes: number;
  atendidos: number;
}