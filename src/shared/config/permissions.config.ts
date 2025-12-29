import type {UserRoleType} from '@shared/types/enums.types'

/**
 * Permisos del sistema MedLink
 * Organizados por módulo
 */
export type Permission =
// === Dashboard ===
  | 'dashboard.view'
  | 'dashboard.analytics'

  // === Gestión de Usuarios (más granular) ===
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'users.lock'
  | 'users.unlock'
  | 'users.changePassword'
  | 'users.viewSensitiveData'  // Ver email, teléfono, ID

  // === Gestión Administrativa ===
  | 'healthCenters.view'
  | 'healthCenters.manage'
  | 'departments.view'
  | 'departments.manage'
  | 'specialties.view'
  | 'specialties.manage'

  // === Gestión Clínica ===
  | 'appointments.view'
  | 'appointments.manage'
  | 'medicalRecords.view'
  | 'medicalRecords.manage'
  | 'medicalRecords.sensitive'
  | 'prescriptions.view'
  | 'prescriptions.manage'
  | 'vaccinations.view'
  | 'vaccinations.manage'
  | 'labTests.view'
  | 'labTests.manage'

  // === Operaciones ===
  | 'shifts.view'
  | 'shifts.manage'

  // === Configuración y Perfil ===
  | 'settings.view'
  | 'settings.manage'
  | 'profile.view'
  | 'profile.manage'

/**
 * Mapa de permisos por rol
 * Estructura: Record<Rol, Record<Permiso, boolean>>
 */
export const ROLE_PERMISSIONS: Record<UserRoleType, Partial<Record<Permission, boolean>>> = {
  ADMIN: {
    // Dashboard
    'dashboard.view': true,
    'dashboard.analytics': true,

    // Usuarios - control completo
    'users.view': true,
    'users.create': true,
    'users.edit': true,
    'users.delete': true,
    'users.lock': true,
    'users.unlock': true,
    'users.changePassword': true,
    'users.viewSensitiveData': true,

    // Gestión administrativa
    'healthCenters.view': true,
    'healthCenters.manage': true,
    'departments.view': true,
    'departments.manage': true,
    'specialties.view': true,
    'specialties.manage': true,

    // Citas
    'appointments.view': true,
    'appointments.manage': true,

    // Historiales (solo ver)
    'medicalRecords.view': true,

    // Prescripciones (solo ver)
    'prescriptions.view': true,

    // Vacunación (solo ver)
    'vaccinations.view': true,

    // Lab (solo ver)
    'labTests.view': true,

    // Turnos
    'shifts.view': true,
    'shifts.manage': true,

    // Configuración
    'settings.view': true,
    'settings.manage': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  DOCTOR: {
    // Dashboard
    'dashboard.view': true,

    // Citas
    'appointments.view': true,
    'appointments.manage': true,

    // Historiales - acceso completo
    'medicalRecords.view': true,
    'medicalRecords.manage': true,
    'medicalRecords.sensitive': true,

    // Prescripciones
    'prescriptions.view': true,
    'prescriptions.manage': true,

    // Vacunación
    'vaccinations.view': true,
    'vaccinations.manage': true,

    // Lab
    'labTests.view': true,
    'labTests.manage': true,

    // Turnos
    'shifts.view': true,

    // Ver centros/departamentos
    'healthCenters.view': true,
    'departments.view': true,
    'specialties.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  NURSE: {
    // Dashboard
    'dashboard.view': true,

    // Citas
    'appointments.view': true,

    // Historiales
    'medicalRecords.view': true,
    'medicalRecords.manage': true,

    // Prescripciones (solo ver)
    'prescriptions.view': true,

    // Vacunación
    'vaccinations.view': true,
    'vaccinations.manage': true,

    // Lab
    'labTests.view': true,

    // Turnos
    'shifts.view': true,

    // Ver centros/departamentos
    'healthCenters.view': true,
    'departments.view': true,
    'specialties.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  RECEPTIONIST: {
    // Dashboard
    'dashboard.view': true,

    // Citas - gestión completa
    'appointments.view': true,
    'appointments.manage': true,

    // Usuarios - solo ver y editar PACIENTES
    'users.view': true,
    'users.edit': true,  // Pero con restricción en useUserPermissions

    // Turnos
    'shifts.view': true,

    // Ver centros/departamentos
    'healthCenters.view': true,
    'departments.view': true,
    'specialties.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  PATIENT: {
    // Dashboard
    'dashboard.view': true,

    // Citas (solo ver propias)
    'appointments.view': true,

    // Historiales (solo ver propio)
    'medicalRecords.view': true,

    // Prescripciones (solo ver propias)
    'prescriptions.view': true,

    // Vacunación (solo ver propia)
    'vaccinations.view': true,

    // Ver centros
    'healthCenters.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  PHARMACIST: {
    // Dashboard
    'dashboard.view': true,

    // Prescripciones
    'prescriptions.view': true,
    'prescriptions.manage': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  TECHNICIAN: {
    // Dashboard
    'dashboard.view': true,

    // Ver centros/departamentos
    'healthCenters.view': true,
    'departments.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  LABORATORY_STAFF: {
    // Dashboard
    'dashboard.view': true,

    // Lab
    'labTests.view': true,
    'labTests.manage': true,

    // Ver historiales (solo para órdenes)
    'medicalRecords.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  RADIOLOGIST: {
    // Dashboard
    'dashboard.view': true,

    // Lab (estudios radiológicos)
    'labTests.view': true,
    'labTests.manage': true,

    // Ver historiales
    'medicalRecords.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },

  SOCIAL_WORKER: {
    // Dashboard
    'dashboard.view': true,

    // Citas (solo ver)
    'appointments.view': true,

    // Historiales (solo ver)
    'medicalRecords.view': true,

    // Usuarios (solo ver)
    'users.view': true,

    // Configuración
    'settings.view': true,

    // Perfil
    'profile.view': true,
    'profile.manage': true,
  },
}

/**
 * Verifica si un rol tiene un permiso específico
 */
export function hasPermission(role: UserRoleType, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[role]
  return rolePermissions?.[permission] === true
}

/**
 * Verifica si un rol tiene todos los permisos especificados
 */
export function hasAllPermissions(role: UserRoleType, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission))
}

/**
 * Verifica si un rol tiene al menos uno de los permisos especificados
 */
export function hasAnyPermission(role: UserRoleType, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission))
}
