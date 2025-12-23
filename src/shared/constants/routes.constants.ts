/**
 * Constantes de Rutas - MedLink
 */

export const ROUTES = {
  // === AUTENTICACIÓN ===
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // === DASHBOARD ===
  DASHBOARD: '/dashboard',

  // === PERFIL Y CONFIGURACIÓN ===
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // === USUARIOS ===
  USERS: '/users',
  USERS_DETAIL: (id: number) => `/users/${id}`,

  // === ADMINISTRACIÓN ===
  ADMIN_HEALTH_CENTERS: '/admin/health-centers',
  ADMIN_HEALTH_CENTERS_DETAIL: (id: number) => `/admin/health-centers/${id}`,

  ADMIN_DEPARTMENTS: '/admin/departments',
  ADMIN_DEPARTMENTS_DETAIL: (id: number) => `/admin/departments/${id}`,

  ADMIN_SPECIALTIES: '/admin/specialties',
  ADMIN_SPECIALTIES_DETAIL: (id: number) => `/admin/specialties/${id}`,

  // === RUTAS FUTURAS (Descomentar cuando implementes) ===
  // APPOINTMENTS: '/appointments',
  // APPOINTMENTS_DETAIL: (id: number) => `/appointments/${id}`,

  // MEDICAL_RECORDS: '/medical-records',
  // MEDICAL_RECORDS_DETAIL: (id: number) => `/medical-records/${id}`,

  // PRESCRIPTIONS: '/prescriptions',
  // PRESCRIPTIONS_DETAIL: (id: number) => `/prescriptions/${id}`,

  // VACCINATIONS: '/vaccinations',
  // VACCINATIONS_DETAIL: (id: number) => `/vaccinations/${id}`,

  // SHIFTS: '/shifts',
  // SHIFTS_DETAIL: (id: number) => `/shifts/${id}`,

  // LAB_TESTS: '/lab-tests',
  // LAB_TESTS_DETAIL: (id: number) => `/lab-tests/${id}`,
} as const

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
] as const

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
  ROUTES.USERS,
  ROUTES.ADMIN_HEALTH_CENTERS,
  ROUTES.ADMIN_DEPARTMENTS,
  ROUTES.ADMIN_SPECIALTIES,
] as const

export const DEFAULT_ROUTE_BY_ROLE = {
  ADMIN: ROUTES.DASHBOARD,
  DOCTOR: ROUTES.DASHBOARD,
  NURSE: ROUTES.DASHBOARD,
  RECEPTIONIST: ROUTES.DASHBOARD,
  PATIENT: ROUTES.DASHBOARD,
  PHARMACIST: ROUTES.DASHBOARD,
  TECHNICIAN: ROUTES.DASHBOARD,
  LABORATORY_STAFF: ROUTES.DASHBOARD,
  RADIOLOGIST: ROUTES.DASHBOARD,
  SOCIAL_WORKER: ROUTES.DASHBOARD,
} as const

export const REDIRECT_ROUTES = {
  AFTER_LOGIN: ROUTES.DASHBOARD,
  AFTER_LOGOUT: ROUTES.LOGIN,
  UNAUTHORIZED: ROUTES.LOGIN,
  NOT_FOUND: ROUTES.DASHBOARD,
} as const

export function isProtectedRoute(path: string): boolean {
  return !PUBLIC_ROUTES.some(route => path.startsWith(route))
}

export function getBaseRoute(path: string): string {
  const segments = path.split('/').filter(Boolean)
  return segments.length > 0 ? `/${segments[0]}` : '/'
}
