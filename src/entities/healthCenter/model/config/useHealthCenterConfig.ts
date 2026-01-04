import {BadgeVariant} from "@shared/types/component.atoms.types.ts"
import type {Component} from 'vue'
import HospitalIcon from "@shared/ui/icons/HospitalIcon.vue"
import PrimaryCareCenterIcon from "@shared/ui/icons/PrimaryCareCenterIcon.vue"
import SpecializedCenterIcon from "@shared/ui/icons/SpecializedCenterIcon.vue"
import EmergencyIcon from "@shared/ui/icons/EmergencyIcon.vue"
import RehabilitationIcon from "@shared/ui/icons/RehabilitationIcon.vue"
import MentalHealthIcon from "@shared/ui/icons/MentalHealthIcon.vue";
import {HealthCenterLevel, HealthCenterType} from "@shared/types/enums.types.ts";

export const HEALTH_CENTER_TYPE_VARIANTS: Record<HealthCenterType, BadgeVariant> = {
  [HealthCenterType.HOSPITAL]: 'primary',
  [HealthCenterType.PRIMARY_CARE_CENTER]: 'secondary',
  [HealthCenterType.SPECIALIZED_CENTER]: 'warning',
  [HealthCenterType.EMERGENCY_CENTER]: 'error',
  [HealthCenterType.MENTAL_HEALTH_CENTER]: 'accent',
  [HealthCenterType.REHABILITATION_CENTER]: 'info',
}

export const HEALTH_CENTER_LEVEL_VARIANTS: Record<HealthCenterLevel, BadgeVariant> = {
  [HealthCenterLevel.PRIMARY]: 'success',
  [HealthCenterLevel.SECONDARY]: 'warning',
  [HealthCenterLevel.TERTIARY]: 'error',
}

export const HEALTH_CENTER_TYPE_ICONS: Record<HealthCenterType, Component> = {
  [HealthCenterType.HOSPITAL]: HospitalIcon,
  [HealthCenterType.PRIMARY_CARE_CENTER]: PrimaryCareCenterIcon,
  [HealthCenterType.SPECIALIZED_CENTER]: SpecializedCenterIcon,
  [HealthCenterType.EMERGENCY_CENTER]: EmergencyIcon,
  [HealthCenterType.MENTAL_HEALTH_CENTER]: MentalHealthIcon,
  [HealthCenterType.REHABILITATION_CENTER]: RehabilitationIcon,
}

/**
 * Convierte cualquier string al formato del enum (ej: "Hospital" -> "HOSPITAL")
 */
function toEnumKey(value: string): string {
  return value
    .toUpperCase()
    .replace(/\s+/g, '_')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
}

/**
 * Obtiene la variante del badge para un tipo de centro
 */
export function getHealthCenterTypeVariant(type: string): BadgeVariant {
  const key = toEnumKey(type) as HealthCenterType
  return HEALTH_CENTER_TYPE_VARIANTS[key] || 'secondary'
}

/**
 * Obtiene la variante del badge para un nivel asistencial
 */
export function getHealthCenterLevelVariant(level: string): BadgeVariant {
  const key = toEnumKey(level) as HealthCenterLevel
  return HEALTH_CENTER_LEVEL_VARIANTS[key] || 'secondary'
}

/**
 * Obtiene el componente de icono para un tipo de centro
 */
export function getHealthCenterTypeIcon(type: string): Component {
  const key = toEnumKey(type) as HealthCenterType
  return HEALTH_CENTER_TYPE_ICONS[key] || HospitalIcon
}
