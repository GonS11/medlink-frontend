// @shared/constants/app.constants.ts

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
  // Public
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Common (todos los roles autenticados)
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',

  // Admin
  ADMIN: {
    USERS: '/admin/users',
    HEALTH_CENTERS: '/admin/health-centers',
    DEPARTMENTS: '/admin/departments',
    SPECIALTIES: '/admin/specialties',
    REPORTS: '/admin/reports',
    AUDIT: '/admin/audit',
  },

  // Doctor
  DOCTOR: {
    APPOINTMENTS: '/doctor/appointments',
    PATIENTS: '/doctor/patients',
    MEDICAL_RECORDS: '/doctor/medical-records',
    PRESCRIPTIONS: '/doctor/prescriptions',
    LAB_TESTS: '/doctor/lab-tests',
    REFERRALS: '/doctor/referrals',
    SCHEDULE: '/doctor/schedule',
    SHIFTS: '/doctor/shifts',
  },

  // Nurse
  NURSE: {
    PATIENT_CARE: '/nurse/patient-care',
    VITAL_SIGNS: '/nurse/vital-signs',
    VACCINATIONS: '/nurse/vaccinations',
    MEDICATION_ADMIN: '/nurse/medication-admin',
    SHIFTS: '/nurse/shifts',
  },

  // Patient
  PATIENT: {
    APPOINTMENTS: '/patient/appointments',
    MEDICAL_HISTORY: '/patient/medical-history',
    PRESCRIPTIONS: '/patient/prescriptions',
    TEST_RESULTS: '/patient/test-results',
  },

  // Receptionist
  RECEPTIONIST: {
    APPOINTMENTS: '/receptionist/appointments',
    CHECK_IN: '/receptionist/check-in',
    PATIENTS: '/receptionist/patients',
  },
} as const
