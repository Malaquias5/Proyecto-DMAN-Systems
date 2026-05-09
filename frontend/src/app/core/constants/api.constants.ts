import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINTS = {
  auth: {
    login:    `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    health:   `${API_BASE_URL}/auth/health`,
  },
  clients: {
    base: `${API_BASE_URL}/clientes`,
    byId: (id: number) => `${API_BASE_URL}/clientes/${id}`,
  },
  services: {
    base: `${API_BASE_URL}/servicios`,
    all:  `${API_BASE_URL}/servicios/all`,
    byId: (id: number) => `${API_BASE_URL}/servicios/${id}`,
  },
  contact: {
    base:         `${API_BASE_URL}/contacto`,
    byId:         (id: number) => `${API_BASE_URL}/contacto/${id}`,
    byStatus:     (estado: string) => `${API_BASE_URL}/contacto/estado/${estado}`,
    updateStatus: (id: number) => `${API_BASE_URL}/contacto/${id}/estado`,
    stats:        `${API_BASE_URL}/contacto/stats`,
  },
  admin: {
    dashboard:           `${API_BASE_URL}/admin/dashboard`,
    clients:             `${API_BASE_URL}/admin/clientes`,
    clientById:          (id: number) => `${API_BASE_URL}/admin/clientes/${id}`,
    messages:            `${API_BASE_URL}/admin/mensajes`,
    messageById:         (id: number) => `${API_BASE_URL}/admin/mensajes/${id}`,
    messagesByStatus:    (estado: string) => `${API_BASE_URL}/admin/mensajes/estado/${estado}`,
    updateMessageStatus: (id: number) => `${API_BASE_URL}/admin/mensajes/${id}/estado`,
  },
} as const;
