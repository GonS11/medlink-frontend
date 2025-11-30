export const APP_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  apiTimeout: 30000,
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
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es'],
} as const

export const PAGINATION_CONFIG = {
  defaultPage: 0,
  defaultSize: 20,
  defaultSortBy: 'id',
  defaultDirection: 'ASC',
} as const

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  CHANGE_PASSWORD: '/change-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  USERS: '/users',
} as const
