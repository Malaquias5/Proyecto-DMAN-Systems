import {
  LoginRequest,
  AuthResponse,
  User,
  Client,
  ClientRequest,
  ServiceItem,
  ContactMessage,
  ContactMessageRequest,
  DashboardStats,
  ApiError,
} from '@core/models';

import {
  MessageStatus,
  ServiceCategory,
  UserRole,
} from '@core/enums';

import {
  phoneValidator,
  strongPasswordValidator,
} from '@core/validators';

import {
  AuthApiService,
  ClientApiService,
  ServiceCatalogApiService,
  ContactApiService,
  AdminApiService,
  AuthStateService,
  ThemeStateService,
  NotificationService,
  LoadingService,
  SeoService,
} from '@core/services';

const testServices: {
  authApi?: AuthApiService;
  clientApi?: ClientApiService;
  serviceCatalogApi?: ServiceCatalogApiService;
  contactApi?: ContactApiService;
  adminApi?: AdminApiService;
  authState?: AuthStateService;
  themeState?: ThemeStateService;
  notifications?: NotificationService;
  loading?: LoadingService;
  seo?: SeoService;
} = {};

const loginRequest: LoginRequest = {
  username: 'admin',
  password: 'admin123',
};

const authResponse: AuthResponse = {
  token: 'eyJhbGc...',
  username: 'admin',
  role: 'ADMIN',
  expiresIn: 86400000,
};

const user: User = {
  username: 'jose',
  role: UserRole.ADMIN,
};

const newClient: ClientRequest = {
  nombre: 'Juan Perez',
  telefono: '987654321',
  email: 'juan@test.com',
  servicio: ServiceCategory.WEB,
  mensaje: 'Necesito una web',
};

const client: Client = {
  id: 1,
  nombre: 'Juan Perez',
  telefono: '987654321',
  email: 'juan@test.com',
  servicio: ServiceCategory.WEB,
  mensaje: 'Necesito una web',
  fechaRegistro: new Date().toISOString(),
};

const serviceItem: ServiceItem = {
  id: 1,
  nombre: 'Pagina Web Corporativa',
  descripcion: 'Sitio web profesional para empresas',
  categoria: ServiceCategory.WEB,
  icono: 'globe',
  activo: true,
};

const message: ContactMessage = {
  id: 1,
  nombre: 'Maria',
  mensaje: 'Hola',
  estado: MessageStatus.PENDIENTE,
  fechaEnvio: new Date().toISOString(),
};

const messageRequest: ContactMessageRequest = {
  nombre: 'Maria',
  email: 'maria@test.com',
  mensaje: 'Quiero una app movil',
};

const dashboard: DashboardStats = {
  totalClientes: 10,
  totalMensajes: 25,
  mensajesPendientes: 5,
  mensajesAtendidos: 20,
};

const apiError: ApiError = {
  timestamp: new Date().toISOString(),
  status: 400,
  error: 'Bad Request',
};

console.log('Todos los modelos, enums, validators y servicios importan correctamente');
console.log({
  testServices,
  enums: { MessageStatus, ServiceCategory, UserRole },
  validators: { phoneValidator, strongPasswordValidator },
  loginRequest,
  authResponse,
  user,
  client,
  newClient,
  serviceItem,
  message,
  messageRequest,
  dashboard,
  apiError,
});