import type {UserInfo} from '@entities/user/model/types/user.types.ts'
import {LanguageCodeType, UserRoleType} from "@shared/types/enums.types.ts";

// Auth Response Types
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  user: UserInfo
}

export interface RegisterResponse {
  userId: number
  email: string
  firstName: string
  lastName: string
  secondLastName?: string
  fullName: string
  role: UserRoleType
  emailVerified: boolean
  message?: string
}

// Auth Request Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  secondLastName?: string
  phone?: string
  mobilePhone?: string
  role: UserRoleType
  preferredLanguage?: LanguageCodeType
}
