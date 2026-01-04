import {ApiResponse, PageResponse, PaginationParams} from "@shared/types/api.types.ts";
import httpClient from "@shared/api/httpClient.ts";
import {
  CreateMedicalSpecialityRequest,
  MedicalSpecialityResponse, UpdateMedicalSpecialityRequest
} from "@entities/medicalSpeciality/model/types/medicalSpeciality.types.ts";

const BASE_URL = 'medical-specialities'

export const getAllMedicalSpecialities = async (params?: PaginationParams) => {
  const response = await httpClient.get<ApiResponse<PageResponse<MedicalSpecialityResponse>>>(BASE_URL, {params});
  return response.data.data!;
}

export const getMedicalSpecialityById = async (medicalSpecialityId: number) => {
  const response = await httpClient.get<ApiResponse<MedicalSpecialityResponse>>(`${BASE_URL}/${medicalSpecialityId}`);
  return response.data.data!;
}

export const createMedicalSpeciality = async (data: CreateMedicalSpecialityRequest) => {
  const response = await httpClient.post<ApiResponse<MedicalSpecialityResponse>>(BASE_URL, data);
  return response.data.data!;
};

export const updateMedicalSpeciality = async (medicalSpecialityId: number, data: UpdateMedicalSpecialityRequest) => {
  const response = await httpClient.put<ApiResponse<MedicalSpecialityResponse>>(`${BASE_URL}/${medicalSpecialityId}`, data);
  return response.data.data!;
};

export const deleteMedicalSpeciality = async (medicalSpecialityId: number) => {
  await httpClient.delete(`${BASE_URL}/${medicalSpecialityId}`);
};
