import httpClient from '@shared/lib/httpClient.ts'
import type {ApiResponse} from '@shared/types/api.types'
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RegisterResponse,
} from '../model/auth.types'

/**
 * Login user
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await httpClient.post<ApiResponse<AuthResponse>>(`/auth/login`, data)
  return response.data.data!
}

/**
 * Register user
 */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const response = await httpClient.post<ApiResponse<RegisterResponse>>(`/auth/register`, data)
  return response.data.data!
}
