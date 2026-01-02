import {LanguageCode, UserRoleType} from "@shared/types/enums.types.ts";

export interface UserResponse {
  id: number
  email: string
  firstName: string
  lastName: string
  secondLastName?: string
  fullName: string
  phone?: string
  mobilePhone?: string
  role: UserRoleType
  isActive: boolean
  emailVerified: boolean
  requiresPasswordChange: boolean
  failedLoginAttempts?: number
  lockedUntil?: string
  preferredLanguage: LanguageCode
  lastLogin?: string
  isAccountLocked?: boolean
  lockReason?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateUserRequest {
  firstName?: string
  lastName?: string
  secondLastName?: string
  phone?: string
  mobilePhone?: string
  preferredLanguage?: LanguageCode
  isActive?: boolean
}

export interface ChangePasswordRequest {
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
  role: UserRoleType
  isActive: boolean
  emailVerified: boolean
  requiresPasswordChange: boolean
  preferredLanguage: LanguageCode
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
