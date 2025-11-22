import {createI18n} from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import {LANGUAGE_CONFIG, STORAGE_KEYS} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'

type SupportedLocale = (typeof LANGUAGE_CONFIG.supportedLanguages)[number]

const savedLanguage = (storage.get<string>(STORAGE_KEYS.LANGUAGE) || LANGUAGE_CONFIG.defaultLanguage) as SupportedLocale

export const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: LANGUAGE_CONFIG.defaultLanguage,
  messages: {
    en,
    es,
  },
  globalInjection: true,
})

/**
 * Cambia el idioma de la aplicación y lo guarda en el almacenamiento.
 * @param locale La cadena de idioma (ej. 'en', 'es').
 */
export function setLanguage(locale: string) {
  // Aseguramos que el locale sea uno de los soportados
  if (LANGUAGE_CONFIG.supportedLanguages.includes(locale)) {
    const supportedLocale = locale as SupportedLocale
    i18n.global.locale.value = supportedLocale
    storage.set(STORAGE_KEYS.LANGUAGE, supportedLocale)
    document.documentElement.lang = supportedLocale
  }
}

// Inicializamos el atributo 'lang' del documento
document.documentElement.lang = savedLanguage
