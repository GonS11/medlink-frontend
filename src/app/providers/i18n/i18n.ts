import {createI18n} from 'vue-i18n'
import en from '@app/providers/i18n/locales/en.json'
import es from '@app/providers/i18n/locales/es.json'
import {storage} from '@shared/lib/storage.ts'
import {LanguageCode, type LanguageCodeType} from '@shared/types/enums.types.ts'
import {LANGUAGE_CONFIG, STORAGE_KEYS} from "@/app";

// ========================================
// MAPEO: LanguageCode ↔ i18n locale
// ========================================

/**
 * Mapeo de LanguageCode (mayúsculas) a locale de i18n (minúsculas)
 * LanguageCode.ES -> 'es'
 */
const LANGUAGE_CODE_TO_LOCALE: Record<LanguageCodeType, string> = {
  [LanguageCode.ES]: 'es',
  [LanguageCode.EN]: 'en',
  [LanguageCode.CA]: 'ca',
  [LanguageCode.EU]: 'eu',
  [LanguageCode.GL]: 'gl',
}

/**
 * Mapeo inverso: locale de i18n (minúsculas) a LanguageCode (mayúsculas)
 * 'es' -> LanguageCode.ES
 */
const LOCALE_TO_LANGUAGE_CODE: Record<string, LanguageCodeType> = {
  'es': LanguageCode.ES,
  'en': LanguageCode.EN,
  'ca': LanguageCode.CA,
  'eu': LanguageCode.EU,
  'gl': LanguageCode.GL,
}

/**
 * Convierte LanguageCode a locale de i18n
 */
export function languageCodeToLocale(code: LanguageCodeType): string {
  return LANGUAGE_CODE_TO_LOCALE[code] || 'en'
}

/**
 * Convierte locale de i18n a LanguageCode
 */
export function localeToLanguageCode(locale: string): LanguageCodeType {
  return LOCALE_TO_LANGUAGE_CODE[locale] || LanguageCode.EN
}

// ========================================
// CONFIGURACIÓN i18n
// ========================================

/**
 * Tipos soportados de locale para i18n (minúsculas)
 */
type SupportedLocale = 'en' | 'es' //| 'ca' | 'eu' | 'gl'

/**
 * Obtiene el idioma guardado y lo convierte a locale de i18n
 */
const getSavedLocale = (): SupportedLocale => {
  const savedLanguageCode = storage.get<LanguageCodeType>(STORAGE_KEYS.LANGUAGE)

  if (savedLanguageCode) {
    return languageCodeToLocale(savedLanguageCode) as SupportedLocale
  }

  return languageCodeToLocale(LANGUAGE_CONFIG.defaultLanguage) as SupportedLocale
}

const initialLocale = getSavedLocale()

// ========================================
// INSTANCIA i18n
// ========================================

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: languageCodeToLocale(LANGUAGE_CONFIG.defaultLanguage),
  messages: {
    en,
    es,
    // ca, eu, gl se pueden agregar cuando estén disponibles
  },
  globalInjection: true,
})

// ========================================
// FUNCIONES DE GESTIÓN DE IDIOMA
// ========================================

/**
 * Cambia el idioma de la aplicación usando LanguageCode
 * @param languageCode - Código de idioma del enum LanguageCode
 *
 * @example
 * setLanguage(LanguageCode.ES)
 * setLanguage(LanguageCode.EN)
 */
export function setLanguage(languageCode: LanguageCodeType): void {
  // Validar que el idioma esté soportado
  if (!LANGUAGE_CONFIG.supportedLanguages.includes(languageCode)) {
    console.warn(`Language ${languageCode} not supported, falling back to ${LANGUAGE_CONFIG.defaultLanguage}`)
    languageCode = LANGUAGE_CONFIG.defaultLanguage
  }
  // Convertir LanguageCode a locale de i18n
  const locale = languageCodeToLocale(languageCode) as SupportedLocale
  // Actualizar i18n
  i18n.global.locale.value = locale
  // Guardar en storage (guardamos el LanguageCode, no el locale)
  storage.set(STORAGE_KEYS.LANGUAGE, languageCode)
  // Actualizar atributo lang del documento
  document.documentElement.lang = locale
}

/**
 * Obtiene el LanguageCode actual
 * @returns El código de idioma actual
 */
export function getCurrentLanguageCode(): LanguageCodeType {
  const currentLocale = i18n.global.locale.value
  return localeToLanguageCode(currentLocale)
}

/**
 * Obtiene el locale actual de i18n
 * @returns El locale actual
 */
export function getCurrentLocale(): string {
  return i18n.global.locale.value
}

document.documentElement.lang = initialLocale
