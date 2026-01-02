import httpClient from "@shared/lib/httpClient.ts";
import {ApiResponse, PageResponse, PaginationParams} from "@shared/types/api.types.ts";
import type {UserResponse, UpdateUserRequest} from "../model/types/user.types";
import {RegisterRequest} from "@entities/auth/model/types/auth.types.ts";

export const getAllUsers = async (params?: PaginationParams) => {
  const response = await httpClient.get<ApiResponse<PageResponse<UserResponse>>>('/users', {params});
  return response.data.data!;
};

export const getUserById = async (userId: number) => {
  const response = await httpClient.get<ApiResponse<UserResponse>>(`/users/${userId}`);
  return response.data.data!;
};

export const createUser = async (data: RegisterRequest) => {
  const response = await httpClient.post<ApiResponse<UserResponse>>('/auth/register', data);
  return response.data.data!;
};

export const updateUser = async (userId: number, data: UpdateUserRequest) => {
  const response = await httpClient.put<ApiResponse<UserResponse>>(`/users/${userId}`, data);
  return response.data.data!;
};

export const deleteUser = async (userId: number) => {
  await httpClient.delete(`/users/${userId}`);
};

export const getCurrentUser = async () => {
  const response = await httpClient.get<ApiResponse<UserResponse>>('/users/me');
  return response.data.data!;
};
