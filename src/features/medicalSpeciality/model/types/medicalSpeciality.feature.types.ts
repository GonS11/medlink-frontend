import type {MedicalSpecialityResponse} from '@entities/medicalSpeciality/model/types/medicalSpeciality.types'
import type {PageResponse} from '@shared/types/api.types'

export type MedicalSpecialityCardActionType = 'edit' | 'delete'

export interface MedicalSpecialityCardAction {
  type: MedicalSpecialityCardActionType
  medicalSpeciality: MedicalSpecialityResponse
}

export interface MedicalSpecialitiesCarouselProps {
  medicalSpecialities: MedicalSpecialityResponse[]
  loading?: boolean
  pagination?: PageResponse<MedicalSpecialityResponse> | null
}

export interface MedicalSpecialitiesCarouselEmits {
  (e: 'action', action: MedicalSpecialityCardAction): void
  (e: 'load-more'): void
}
