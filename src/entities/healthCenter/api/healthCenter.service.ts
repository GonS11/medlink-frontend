import {ApiResponse, PageResponse, PaginationParams} from "@shared/types/api.types.ts";
import httpClient from "@shared/lib/httpClient.ts";
import {
  CreateHealthCenterRequest,
  HealthCenterResponse,
  UpdateHealthCenterRequest
} from "@entities/healthCenter/model/types/healthCenter.types.ts";

const BASE_URL = 'health-centers';

export const getAllHealthCenters = async (params?: PaginationParams) => {
  const response = await httpClient.get<ApiResponse<PageResponse<HealthCenterResponse>>>(BASE_URL, {params});
  return response.data.data!;
};

export const getHealthCenterById = async (healthCenterId: number) => {
  const response = await httpClient.get<ApiResponse<HealthCenterResponse>>(`${BASE_URL}/${healthCenterId}`);
  return response.data.data!;
};

export const createHealthCenter = async (data: CreateHealthCenterRequest) => {
  const response = await httpClient.post<ApiResponse<HealthCenterResponse>>(BASE_URL, data);
  return response.data.data!;
};

export const updateHealthCenter = async (healthCenterId: number, data: UpdateHealthCenterRequest) => {
  const response = await httpClient.put<ApiResponse<HealthCenterResponse>>(`${BASE_URL}/${healthCenterId}`, data);
  return response.data.data!;
};

export const deleteHealthCenter = async (healthCenterId: number) => {
  await httpClient.delete(`${BASE_URL}/${healthCenterId}`);
};
