import {
  LanguageCode,
  LANGUAGE_DISPLAY_NAMES,
  LANGUAGE_CODE_FROM_DISPLAY,
  AutonomousCommunity,
  COMMUNITY_DISPLAY_NAMES,
  COMMUNITY_KEY_FROM_DISPLAY,
  HealthCenterType,
  HEALTH_CENTER_TYPE_DISPLAY_NAMES,
  HEALTH_CENTER_TYPE_FROM_DISPLAY,
  HealthCenterLevel,
  HEALTH_CENTER_LEVEL_DISPLAY_NAMES,
  HEALTH_CENTER_LEVEL_FROM_DISPLAY,
} from '@shared/types/enums.types'

// ========================================
// TIPOS
// ========================================

export interface FieldTransformer<T = any, U = any> {
  toBackend: (value: T) => U
  fromBackend: (value: U) => T
  canTransform?: (value: any) => boolean
}

// ========================================
// TRANSFORMADORES ESPECÍFICOS
// ========================================

const languageTransformer: FieldTransformer<LanguageCode, string> = {
  toBackend: (code: LanguageCode) => LANGUAGE_DISPLAY_NAMES[code],
  fromBackend: (displayName: string) => {
    const code = LANGUAGE_CODE_FROM_DISPLAY[displayName]
    if (!code) {
      console.warn(`⚠️ Unknown language: "${displayName}", defaulting to EN`)
      return LanguageCode.EN
    }
    return code
  },
  canTransform: (value: any) => typeof value === 'string',
}

const communityTransformer: FieldTransformer<AutonomousCommunity, string> = {
  toBackend: (key: AutonomousCommunity) => {
    const displayName = COMMUNITY_DISPLAY_NAMES[key]
    if (!displayName) {
      console.error(`❌ Unknown community key: "${key}"`)
      return key as string
    }
    return displayName
  },
  fromBackend: (displayName: string) => {
    const key = COMMUNITY_KEY_FROM_DISPLAY[displayName]
    if (!key) {
      console.error(`❌ Unknown community: "${displayName}"`)
      console.error('Available:', Object.keys(COMMUNITY_KEY_FROM_DISPLAY))
      return displayName.toUpperCase().replace(/\s/g, '_').replace(/-/g, '_') as AutonomousCommunity
    }
    return key
  },
  canTransform: (value: any) => typeof value === 'string',
}

const healthCenterTypeTransformer: FieldTransformer<HealthCenterType, string> = {
  toBackend: (key: HealthCenterType) => {
    const displayName = HEALTH_CENTER_TYPE_DISPLAY_NAMES[key]
    if (!displayName) {
      console.error(`❌ Unknown health center type: "${key}"`)
      return key as string
    }
    return displayName
  },
  fromBackend: (displayName: string) => {
    const key = HEALTH_CENTER_TYPE_FROM_DISPLAY[displayName]
    if (!key) {
      console.error(`❌ Unknown health center type: "${displayName}"`)
      console.error('Available:', Object.keys(HEALTH_CENTER_TYPE_FROM_DISPLAY))
      return displayName.toUpperCase().replace(/\s/g, '_') as HealthCenterType
    }
    return key
  },
  canTransform: (value: any) => typeof value === 'string',
}

const healthCenterLevelTransformer: FieldTransformer<HealthCenterLevel, string> = {
  toBackend: (key: HealthCenterLevel) => {
    const displayName = HEALTH_CENTER_LEVEL_DISPLAY_NAMES[key]
    if (!displayName) {
      console.error(`❌ Unknown health center level: "${key}"`)
      return key as string
    }
    return displayName
  },
  fromBackend: (displayName: string) => {
    const key = HEALTH_CENTER_LEVEL_FROM_DISPLAY[displayName]
    if (!key) {
      console.error(`❌ Unknown health center level: "${displayName}"`)
      console.error('Available:', Object.keys(HEALTH_CENTER_LEVEL_FROM_DISPLAY))
      return displayName.toUpperCase() as HealthCenterLevel
    }
    return key
  },
  canTransform: (value: any) => typeof value === 'string',
}

// ========================================
// REGISTRO DE TRANSFORMADORES
// ========================================

/**
 * Mapeo de nombres de campos a sus transformadores
 *
 * ✅ Agregar aquí cualquier nuevo enum que necesite transformación
 */
export const FIELD_TRANSFORMERS: Record<string, FieldTransformer> = {
  preferredLanguage: languageTransformer,
  autonomousCommunity: communityTransformer,
  type: healthCenterTypeTransformer,
  level: healthCenterLevelTransformer,
}

// ========================================
// FUNCIONES GENÉRICAS DE TRANSFORMACIÓN
// ========================================

/**
 * Transforma un objeto completo (Frontend -> Backend)
 */
export function transformToBackend(data: any): any {
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(transformToBackend)

  const transformed: any = {}

  for (const [key, value] of Object.entries(data)) {
    const transformer = FIELD_TRANSFORMERS[key]

    if (transformer && value !== null && value !== undefined) {
      if (!transformer.canTransform || transformer.canTransform(value)) {
        try {
          transformed[key] = transformer.toBackend(value)
        } catch (error) {
          console.error(`Failed to transform field "${key}" to backend:`, error)
          transformed[key] = value
        }
      } else {
        transformed[key] = value
      }
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      transformed[key] = transformToBackend(value)
    } else {
      transformed[key] = value
    }
  }

  return transformed
}

/**
 * Transforma un objeto completo (Backend -> Frontend)
 */
export function transformFromBackend(data: any): any {
  if (!data || typeof data !== 'object') return data
  if (Array.isArray(data)) return data.map(transformFromBackend)

  for (const [key, value] of Object.entries(data)) {
    const transformer = FIELD_TRANSFORMERS[key]

    if (transformer && value !== null && value !== undefined) {
      if (!transformer.canTransform || transformer.canTransform(value)) {
        try {
          data[key] = transformer.fromBackend(value)
        } catch (error) {
          console.error(`Failed to transform field "${key}" from backend:`, error)
        }
      }
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      transformFromBackend(value)
    }
  }

  return data
}
