import type {HealthCenterResponse} from './healthCenter.types'
import type {Component} from 'vue'
import type {BadgeVariant} from "@shared/types/component.atoms.types.ts"

export interface HealthCenterFormProps {
  healthCenter?: HealthCenterResponse
  mode: 'create' | 'edit'
  loading?: boolean
}

export interface HealthCenterDetailViewProps {
  healthCenter: HealthCenterResponse | null
  loading?: boolean
}

// ==================== Field Configuration Types ====================

export interface BaseField {
  key: keyof HealthCenterResponse
  label: string
  formatter?: (value: any) => string
}

export interface SimpleField extends BaseField {
  isLink?: false
  conditional?: false
  customValue?: never
}

export interface LinkField extends BaseField {
  isLink: true
  conditional?: false
  customValue?: never
}

export interface ConditionalField extends BaseField {
  isLink?: false
  conditional: true
  customValue?: never
}

export interface CustomValueField extends BaseField {
  isLink?: false
  conditional?: false
  customValue: string
}

export type HealthCenterField = SimpleField | LinkField | ConditionalField | CustomValueField

export interface HealthCenterServiceField {
  key: keyof Pick<HealthCenterResponse, 'hasEmergency' | 'hasICU' | 'hasHeliport' | 'isTeachingHospital'>
  label: string
  variant: BadgeVariant
  icon: Component
}
