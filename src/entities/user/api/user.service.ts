import httpClient from '@shared/lib/http-client'
import type {ApiResponse, PageResponse, PaginationParams} from '@shared/types/api.types'
import type {
  UserResponse,
  UpdateUserRequest,
  ChangePasswordRequest,
  LockAccountRequest,
} from '../model/user.types'

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<UserResponse> {
  const response = await httpClient.get<ApiResponse<UserResponse>>('/users/me')
  return response.data.data!
}

/**
 * Get user by ID
 */
export async function getUserById(userId: number): Promise<UserResponse> {
  const response = await httpClient.get<ApiResponse<UserResponse>>(`/users/${userId}`)
  return response.data.data!
}

/**
 * Get all users (paginated)
 */
export async function getAllUsers(params?: PaginationParams): Promise<PageResponse<UserResponse>> {
  const response = await httpClient.get<ApiResponse<PageResponse<UserResponse>>>('/users', {
    params,
  })
  return response.data.data!
}

/**
 * Update user
 */
export async function updateUser(userId: number, data: UpdateUserRequest): Promise<UserResponse> {
  const response = await httpClient.put<ApiResponse<UserResponse>>(`/users/${userId}`, data)
  return response.data.data!
}

/**
 * Delete user
 */
export async function deleteUser(userId: number): Promise<void> {
  await httpClient.delete(`/users/${userId}`)
}

/**
 * Change password
 */
export async function changePassword(userId: number, data: ChangePasswordRequest): Promise<void> {
  await httpClient.post(`/users/${userId}/change-password`, data)
}

/**
 * Lock account
 */
export async function lockAccount(userId: number, data: LockAccountRequest): Promise<void> {
  await httpClient.post(`/users/${userId}/lock`, data)
}

/**
 * Unlock account
 */
export async function unlockAccount(userId: number): Promise<void> {
  await httpClient.post(`/users/${userId}/unlock`)
}
