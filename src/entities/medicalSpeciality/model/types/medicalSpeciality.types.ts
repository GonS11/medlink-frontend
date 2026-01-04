import {SpecialityCategory} from "@shared/types/enums.types.ts";

export interface MedicalSpecialityResponse {
  id: number
  code: string
  name: string
  category: SpecialityCategory
  requiresMIR: boolean
  yearsOfTraining:number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateMedicalSpecialityRequest {
  name: string
  category: SpecialityCategory,
  requiresMIR?: boolean
  yearsOfTraining?:number
  isActive?: boolean
}

export interface UpdateMedicalSpecialityRequest {
  name?: string
  category?: SpecialityCategory,
  requiresMIR?: boolean
  yearsOfTraining?:number
  isActive?: boolean
}
