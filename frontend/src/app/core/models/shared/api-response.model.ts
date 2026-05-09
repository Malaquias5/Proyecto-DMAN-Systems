/**
 * Wrapper generico para respuestas con metadata adicional.
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}