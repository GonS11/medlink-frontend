import type {UserRoleType} from '@shared/types/api.types'

export type RoleVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'accent'

export const USER_ROLE_VARIANTS: Record<UserRoleType, RoleVariant> = {
  ADMIN: 'error',
  DOCTOR: 'primary',
  NURSE: 'accent',
  PATIENT: 'success',
  RECEPTIONIST: 'warning',
  PHARMACIST: 'primary',
  TECHNICIAN: 'secondary',
  LABORATORY_STAFF: 'secondary',
  RADIOLOGIST: 'primary',
  SOCIAL_WORKER: 'accent',
} as const

export const USER_STATUS_VARIANTS = {
  active: 'success',
  inactive: 'secondary',
  locked: 'error',
} as const
