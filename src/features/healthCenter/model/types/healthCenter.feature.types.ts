import type {HealthCenterResponse} from '@entities/healthCenter/model/types/healthCenter.types'
import type {TableColumn, SortConfig} from '@shared/types/table.types'
import type {PageResponse} from '@shared/types/api.types'

// Tipos de acciones disponibles en la tabla
export type HealthCenterTableActionType =
  | 'view'
  | 'edit'
  | 'delete'
  | 'statistics'
  | 'departments'
  | 'export'

// Payload del evento action
export interface HealthCenterTableAction {
  type: HealthCenterTableActionType
  healthCenter: HealthCenterResponse
}

// Props del componente HealthCentersTable
export interface HealthCenterTableProps {
  healthCenters: HealthCenterResponse[]
  columns: TableColumn[]
  loading?: boolean
  pagination?: PageResponse<HealthCenterResponse> | null
}

// Emits del componente HealthCentersTable
export interface HealthCenterTableEmits {
  (e: 'action', payload: HealthCenterTableAction): void
  (e: 'page-change', page: number): void
  (e: 'sort', config: SortConfig): void
}

// Tipos de filtros disponibles
export interface HealthCenterFilters {
  search?: string
  type?: string[]  // HealthCenterType[]
  level?: string[]  // HealthCenterLevel[]
  autonomousCommunity?: string[]  // AutonomousCommunity[]
  isPublic?: boolean
  hasEmergency?: boolean
  hasICU?: boolean
  hasHeliport?: boolean
  isTeachingHospital?: boolean
}

// Props del componente HealthCenterFilters
export interface HealthCenterFiltersProps {
  filters: HealthCenterFilters
  loading?: boolean
}

// Emits del componente HealthCenterFilters
export interface HealthCenterFiltersEmits {
  (e: 'update:filters', filters: HealthCenterFilters): void

  (e: 'clear'): void

  (e: 'apply'): void
}

// Opciones para el selector de tipo de centro
export interface HealthCenterTypeOption {
  value: string
  label: string
  icon?: string
}

// Opciones para el selector de nivel asistencial
export interface HealthCenterLevelOption {
  value: string
  label: string
  color?: string
}

// Props para vista de detalles
export interface HealthCenterDetailProps {
  healthCenter: HealthCenterResponse
}

// Props para vista de estadísticas
export interface HealthCenterStatsProps {
  healthCenter: HealthCenterResponse
  loading?: boolean
}

// Datos de estadísticas
export interface HealthCenterStats {
  totalCapacity: number
  availableBeds: number
  occupancyRate: number
  icuOccupancy: number
  emergencyOccupancy: number
  totalStaff: number
  totalDepartments: number
  totalPatients: number
  monthlyAppointments: number
  averageWaitTime: number
}
