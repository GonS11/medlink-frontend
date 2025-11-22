export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  apiTimeout: 30000,
  tokenKey: 'medlink_access_token',
  refreshTokenKey: 'medlink_refresh_token',
  userKey: 'medlink_user',
  languageKey: 'medlink_language',
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'es'],
  pagination: {
    defaultPage: 0,
    defaultSize: 20,
    defaultSortBy: 'id',
    defaultDirection: 'ASC',
  },
} as const

export type AppConfig = typeof appConfig