import type {HealthCenterResponse} from './healthCenter.types'
import {ComputedRef} from "vue";

export interface UseHealthCenterFormOptions {
  mode: 'create' | 'edit'
  healthCenter?: HealthCenterResponse
  onSubmit: (data: any) => void
  onCancel: () => void
}

export interface FormattedHealthCenterName {
  main: string
  secondary: string
  type: string
}

export interface FormattedHealthCenterLocation {
  main: string
  secondary: string
  full: string
}

export interface HealthCenterFormatters {
  formatName: ComputedRef<FormattedHealthCenterName>
  formatLocation: ComputedRef<FormattedHealthCenterLocation>
  formatBeds: ComputedRef<string>
  hasServices: ComputedRef<boolean>
  servicesCount: ComputedRef<number>
}
