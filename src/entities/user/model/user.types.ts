import type { UserRole, Languages } from '@shared/types/api.types'

// User Response Type
export interface UserResponse {
  id: number
  email: string
  firstName: string
  lastName: string
  secondLastName?: string
  fullName: string
  phone?: string
  mobilePhone?: string
  role: UserRole
  isActive: boolean
  emailVerified: boolean
  requiresPasswordChange: boolean
  failedLoginAttempts?: number
  lockedUntil?: string
  preferredLanguage: Languages
  lastLogin?: string
  createdAt: string
  updatedAt: string
  isAccountLocked?: boolean
}

// User Request Types
export interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  secondLastName?: string
  phone?: string
  mobilePhone?: string
  preferredLanguage?: Languages
  isActive?: boolean
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface LockAccountRequest {
  durationMinutes?: number
  reason?: string
}

// User Info for Auth
export interface UserInfo {
  userId: number
  email: string
  firstName: string
  lastName: string
  secondLastName?: string
  fullName: string
  phone?: string
  mobilePhone?: string
  role: UserRole
  isActive: boolean
  emailVerified: boolean
  requiresPasswordChange: boolean
  preferredLanguage: Languages
  roleData?: RoleData
}

export interface RoleData {
  roleEntityId: number
  specialty?: string
  collegialNumber?: string
  healthCenterId?: number
  healthCardNumber?: string
  primaryDoctorId?: number
}