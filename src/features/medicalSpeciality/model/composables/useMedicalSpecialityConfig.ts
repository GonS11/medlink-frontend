import {SpecialityCategory} from '@shared/types/enums.types'
import {BadgeVariant} from "@shared/types/component.atoms.types.ts"
import type {Component} from "vue"
import HealthCareCenterIcon from "@shared/ui/icons/HealthCareCenterIcon.vue"
import LaboratoryIcon from "@shared/ui/icons/LaboratoryIcon.vue"
import SurgicalIcon from "@shared/ui/icons/SurgicalIcon.vue"
import HospitalIcon from "@shared/ui/icons/HospitalIcon.vue"

export const SPECIALITY_CATEGORY_VARIANTS: Record<SpecialityCategory, BadgeVariant> = {
  [SpecialityCategory.MEDICAL]: 'info',
  [SpecialityCategory.SURGICAL]: 'error',
  [SpecialityCategory.LABORATORY]: 'warning',
  [SpecialityCategory.PRIMARY_CARE]: 'success',
}

export const SPECIALITY_CATEGORY_ICONS: Record<SpecialityCategory, Component> = {
  [SpecialityCategory.MEDICAL]: HospitalIcon,
  [SpecialityCategory.SURGICAL]: SurgicalIcon,
  [SpecialityCategory.LABORATORY]: LaboratoryIcon,
  [SpecialityCategory.PRIMARY_CARE]: HealthCareCenterIcon
}

function toEnumKey(value: string): string {
  if (!value) return ''
  return value
    .toUpperCase()
    .replace(/\s+/g, '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function getSpecialityCategoryVariant(category: string): BadgeVariant {
  const key = toEnumKey(category) as SpecialityCategory
  return SPECIALITY_CATEGORY_VARIANTS[key] || 'secondary'
}

export function getSpecialityCategoryIcon(category: string): Component {
  const key = toEnumKey(category) as SpecialityCategory
  return SPECIALITY_CATEGORY_ICONS[key] || HospitalIcon
}

export function getSpecialityCategoryKey(category: string): string {
  const key = toEnumKey(category)
  const safeKey = key || SpecialityCategory.MEDICAL
  return `medicalSpeciality.categories.${safeKey}`
}
