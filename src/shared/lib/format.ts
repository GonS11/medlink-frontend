import {LanguageCode, type LanguageCodeType} from '@shared/types/enums.types.ts'

/**
 * Mapeo de LanguageCode a locale BCP 47
 * LanguageCode es para el backend, locale es para formateo de fechas/números
 */
const LANGUAGE_TO_LOCALE: Record<LanguageCodeType, string> = {
  [LanguageCode.ES]: 'es-ES',
  [LanguageCode.EN]: 'en-US',
  [LanguageCode.CA]: 'ca-ES',
  [LanguageCode.EU]: 'eu-ES',
  [LanguageCode.GL]: 'gl-ES',
}

/**
 * Obtiene el locale correspondiente al código de idioma
 */
export function getLocaleFromLanguageCode(languageCode: LanguageCodeType): string {
  return LANGUAGE_TO_LOCALE[languageCode] || 'en-US'
}

/**
 * Format date to locale string
 * @param date - Fecha a formatear
 * @param languageCode - Código de idioma (opcional, usa 'es-ES' por defecto)
 */
export function formatDate(
  date: Date | string | null | undefined,
  languageCode?: LanguageCodeType
): string {
  if (!date) {
    return '-'
  }

  const locale = languageCode ? getLocaleFromLanguageCode(languageCode) : 'es-ES'
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date time to locale string
 * @param date - Fecha a formatear
 * @param languageCode - Código de idioma (opcional, usa 'es-ES' por defecto)
 */
export function formatDateTime(
  date: Date | string | null | undefined,
  languageCode?: LanguageCodeType
): string {
  if (!date) {
    return '-'
  }

  const locale = languageCode ? getLocaleFromLanguageCode(languageCode) : 'es-ES'
  const dateObj = typeof date === 'string' ? new Date(date) : date

  return dateObj.toLocaleString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Get initials from name
 */
export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.charAt(0) || ''
  const last = lastName?.charAt(0) || ''
  return `${first}${last}`.toUpperCase()
}

/**
 * Check if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return true
  }
  if (typeof value === 'string') {
    return value.trim() === ''
  }
  if (Array.isArray(value)) {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}
