import {AutonomousCommunity, HealthCenterType, HealthCenterLevel} from "@shared/types/enums.types"

export interface HealthCenterResponse {
  id: number
  code: string
  name: string
  type: HealthCenterType
  level: HealthCenterLevel
  autonomousCommunity: AutonomousCommunity
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  emergencyPhone?: string
  email?: string
  website?: string
  totalBeds: number
  icuBeds: number
  emergencyBeds: number
  hasEmergency: boolean
  hasICU: boolean
  hasHeliport: boolean
  isTeachingHospital: boolean
  isPublic: boolean
  accreditations?: string
  createdAt: string
  updatedAt: string
}

export interface CreateHealthCenterRequest {
  name: string
  type: HealthCenterType
  level: HealthCenterLevel
  autonomousCommunity: AutonomousCommunity
  address: string
  city: string
  province: string
  postalCode: string
  phone: string
  emergencyPhone?: string
  email?: string
  website?: string
  totalBeds?: number
  icuBeds?: number
  emergencyBeds?: number
  hasEmergency: boolean
  hasICU: boolean
  hasHeliport?: boolean
  isTeachingHospital?: boolean
  isPublic: boolean
  accreditations?: string
}

export type UpdateHealthCenterRequest = Partial<CreateHealthCenterRequest>
