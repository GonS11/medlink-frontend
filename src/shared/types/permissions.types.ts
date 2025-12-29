/**
 * Tipos de Permisos - MedLink
 *
 * Este archivo SOLO contiene:
 * - Type aliases
 * - MODULE_ACCESS (helpers de configuración)
 *
 * NO contiene ni re-exporta:
 * - ROLE_PERMISSIONS (está en .config)
 * - hasPermission() (está en .config)
 * - hasAllPermissions() (está en .config)
 * - hasAnyPermission() (está en .config)
 *
 * Para usar permisos, importa directamente de permissions.config.ts
 */

import type {UserRoleType} from '@shared/types/enums.types'
import type {Permission as ConfigPermission} from '@shared/config/permissions.config'

/**
 * Tipo de usuario (alias para conveniencia)
 */
export type UserRole = UserRoleType

/**
 * Tipo de permiso (alias para conveniencia)
 */
export type Permission = ConfigPermission

/**
 * Helpers de configuración de acceso para módulos
 * Úsalos en navigation.constants.ts y router
 */
export const MODULE_ACCESS = {
  PUBLIC: {
    roles: ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT', 'PHARMACIST', 'TECHNICIAN', 'LABORATORY_STAFF', 'RADIOLOGIST', 'SOCIAL_WORKER'] as UserRole[],
  },
  MEDICAL_STAFF: {
    roles: ['ADMIN', 'DOCTOR', 'NURSE'] as UserRole[],
  },
  CLINICAL_STAFF: {
    roles: ['ADMIN', 'DOCTOR', 'NURSE', 'LABORATORY_STAFF', 'RADIOLOGIST', 'PHARMACIST'] as UserRole[],
  },
  ADMIN_ONLY: {
    roles: ['ADMIN'] as UserRole[],
  },
  ADMINISTRATIVE_STAFF: {
    roles: ['ADMIN', 'RECEPTIONIST'] as UserRole[],
  },
  AUTHENTICATED: {
    roles: ['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST', 'PATIENT', 'PHARMACIST', 'TECHNICIAN', 'LABORATORY_STAFF', 'RADIOLOGIST', 'SOCIAL_WORKER'] as UserRole[],
  },
} as const
