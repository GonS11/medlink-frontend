import {LanguageCode} from '@shared/types/enums.types'

export const APP_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  apiTimeout: 30000,
  appName: 'MedLink',
  version: '1.0.0',
} as const

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  REMEMBER_EMAIL: 'remember_email',
  LANGUAGE: 'language',
  THEME: 'theme',
} as const

export const LANGUAGE_CONFIG = {
  defaultLanguage: LanguageCode.EN,
  supportedLanguages: [LanguageCode.EN, LanguageCode.ES, LanguageCode.CA, LanguageCode.EU, LanguageCode.GL],
} as const

export const PAGINATION_CONFIG = {
  defaultPage: 0,
  defaultSize: 20,
  defaultSortBy: 'id',
  defaultDirection: 'ASC',
} as const
