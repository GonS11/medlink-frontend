// ========================================
// LANGUAGES ENUM
// ========================================

/**
 * Language codes (ISO 639-1)
 * Frontend usa códigos, backend usa displayNames
 */
export enum LanguageCode {
  ES = 'ES',
  CA = 'CA',
  EU = 'EU',
  GL = 'GL',
  EN = 'EN',
}

/**
 * Mapeo entre códigos y displayNames del backend
 */
export const LANGUAGE_DISPLAY_NAMES: Record<LanguageCode, string> = {
  [LanguageCode.ES]: 'Spanish',
  [LanguageCode.CA]: 'Catalan',
  [LanguageCode.EU]: 'Euskera',
  [LanguageCode.GL]: 'Galician',
  [LanguageCode.EN]: 'English',
} as const

/**
 * Mapeo inverso: displayName -> código
 */
export const LANGUAGE_CODE_FROM_DISPLAY: Record<string, LanguageCode> = {
  'Spanish': LanguageCode.ES,
  'Catalan': LanguageCode.CA,
  'Euskera': LanguageCode.EU,
  'Galician': LanguageCode.GL,
  'English': LanguageCode.EN,
} as const

/**
 * Array de códigos para validación Zod
 */
export const LanguageCodeArray = Object.values(LanguageCode) as [LanguageCode, ...LanguageCode[]]

/**
 * Tipo para códigos de idioma
 */
export type LanguageCodeType = typeof LanguageCode[keyof typeof LanguageCode]

// ========================================
// AUTONOMOUS COMMUNITY ENUM
// ========================================

/**
 * Claves de comunidades autónomas
 */
export enum AutonomousCommunity {
  ANDALUCIA = "ANDALUCIA",
  ARAGON = "ARAGON",
  ASTURIAS = "ASTURIAS",
  BALEARES = "BALEARES",
  CANARIAS = "CANARIAS",
  CANTABRIA = "CANTABRIA",
  CASTILLA_LA_MANCHA = "CASTILLA_LA_MANCHA",
  CASTILLA_Y_LEON = "CASTILLA_Y_LEON",
  CATALUNA = "CATALUNA",
  COMUNIDAD_VALENCIANA = "COMUNIDAD_VALENCIANA",
  EXTREMADURA = "EXTREMADURA",
  GALICIA = "GALICIA",
  MADRID = "MADRID",
  MURCIA = "MURCIA",
  NAVARRA = "NAVARRA",
  PAIS_VASCO = "PAIS_VASCO",
  LA_RIOJA = "LA_RIOJA",
  CEUTA = "CEUTA",
  MELILLA = "MELILLA"
}

/**
 * Mapeo entre enum keys y displayNames del backend
 */
export const COMMUNITY_DISPLAY_NAMES: Record<AutonomousCommunity, string> = {
  [AutonomousCommunity.ANDALUCIA]: 'Andalucía',
  [AutonomousCommunity.ARAGON]: 'Aragón',
  [AutonomousCommunity.ASTURIAS]: 'Asturias',
  [AutonomousCommunity.BALEARES]: 'Baleares',
  [AutonomousCommunity.CANARIAS]: 'Canarias',
  [AutonomousCommunity.CANTABRIA]: 'Cantabria',
  [AutonomousCommunity.CASTILLA_LA_MANCHA]: 'Castilla-La Mancha',
  [AutonomousCommunity.CASTILLA_Y_LEON]: 'Castilla y León',
  [AutonomousCommunity.CATALUNA]: 'Cataluña',
  [AutonomousCommunity.COMUNIDAD_VALENCIANA]: 'Comunidad Valenciana',
  [AutonomousCommunity.EXTREMADURA]: 'Extremadura',
  [AutonomousCommunity.GALICIA]: 'Galicia',
  [AutonomousCommunity.MADRID]: 'Madrid',
  [AutonomousCommunity.MURCIA]: 'Murcia',
  [AutonomousCommunity.NAVARRA]: 'Navarra',
  [AutonomousCommunity.PAIS_VASCO]: 'País Vasco',
  [AutonomousCommunity.LA_RIOJA]: 'La Rioja',
  [AutonomousCommunity.CEUTA]: 'Ceuta',
  [AutonomousCommunity.MELILLA]: 'Melilla',
} as const

/**
 * Mapeo inverso: displayName -> enum key
 */
export const COMMUNITY_KEY_FROM_DISPLAY: Record<string, AutonomousCommunity> = {
  'Andalucía': AutonomousCommunity.ANDALUCIA,
  'Aragón': AutonomousCommunity.ARAGON,
  'Asturias': AutonomousCommunity.ASTURIAS,
  'Baleares': AutonomousCommunity.BALEARES,
  'Canarias': AutonomousCommunity.CANARIAS,
  'Cantabria': AutonomousCommunity.CANTABRIA,
  'Castilla-La Mancha': AutonomousCommunity.CASTILLA_LA_MANCHA,
  'Castilla y León': AutonomousCommunity.CASTILLA_Y_LEON,
  'Cataluña': AutonomousCommunity.CATALUNA,
  'Comunidad Valenciana': AutonomousCommunity.COMUNIDAD_VALENCIANA,
  'Extremadura': AutonomousCommunity.EXTREMADURA,
  'Galicia': AutonomousCommunity.GALICIA,
  'Madrid': AutonomousCommunity.MADRID,
  'Murcia': AutonomousCommunity.MURCIA,
  'Navarra': AutonomousCommunity.NAVARRA,
  'País Vasco': AutonomousCommunity.PAIS_VASCO,
  'La Rioja': AutonomousCommunity.LA_RIOJA,
  'Ceuta': AutonomousCommunity.CEUTA,
  'Melilla': AutonomousCommunity.MELILLA,
} as const

/**
 * Array para validación Zod
 */
export const AutonomousCommunityArray = Object.values(AutonomousCommunity) as [AutonomousCommunity, ...AutonomousCommunity[]]

// ========================================
// HEALTH CENTER TYPE ENUM
// ========================================

export enum HealthCenterType {
  HOSPITAL = "HOSPITAL",
  PRIMARY_CARE_CENTER = "PRIMARY_CARE_CENTER",
  SPECIALIZED_CENTER = "SPECIALIZED_CENTER",
  EMERGENCY_CENTER = "EMERGENCY_CENTER",
  MENTAL_HEALTH_CENTER = "MENTAL_HEALTH_CENTER",
  REHABILITATION_CENTER = "REHABILITATION_CENTER"
}

/**
 * Mapeo entre enum keys y displayNames del backend
 */
export const HEALTH_CENTER_TYPE_DISPLAY_NAMES: Record<HealthCenterType, string> = {
  [HealthCenterType.HOSPITAL]: 'Hospital',
  [HealthCenterType.PRIMARY_CARE_CENTER]: 'Primary care center',
  [HealthCenterType.SPECIALIZED_CENTER]: 'Specialized center',
  [HealthCenterType.EMERGENCY_CENTER]: 'Emergency center',
  [HealthCenterType.MENTAL_HEALTH_CENTER]: 'Mental health center',
  [HealthCenterType.REHABILITATION_CENTER]: 'Rehabilitation center',
} as const

/**
 * Mapeo inverso: displayName -> enum key
 */
export const HEALTH_CENTER_TYPE_FROM_DISPLAY: Record<string, HealthCenterType> = {
  'Hospital': HealthCenterType.HOSPITAL,
  'Primary care center': HealthCenterType.PRIMARY_CARE_CENTER,
  'Specialized center': HealthCenterType.SPECIALIZED_CENTER,
  'Emergency center': HealthCenterType.EMERGENCY_CENTER,
  'Mental health center': HealthCenterType.MENTAL_HEALTH_CENTER,
  'Rehabilitation center': HealthCenterType.REHABILITATION_CENTER,
} as const

/**
 * Array para validación Zod
 */
export const HealthCenterTypeArray = Object.values(HealthCenterType) as [HealthCenterType, ...HealthCenterType[]]

// ========================================
// HEALTH CENTER LEVEL ENUM
// ========================================

export enum HealthCenterLevel {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  TERTIARY = "TERTIARY"
}

/**
 * Mapeo entre enum keys y displayNames del backend
 */
export const HEALTH_CENTER_LEVEL_DISPLAY_NAMES: Record<HealthCenterLevel, string> = {
  [HealthCenterLevel.PRIMARY]: 'Primary',
  [HealthCenterLevel.SECONDARY]: 'Secondary',
  [HealthCenterLevel.TERTIARY]: 'Tertiary',
} as const

/**
 * Mapeo inverso: displayName -> enum key
 */
export const HEALTH_CENTER_LEVEL_FROM_DISPLAY: Record<string, HealthCenterLevel> = {
  'Primary': HealthCenterLevel.PRIMARY,
  'Secondary': HealthCenterLevel.SECONDARY,
  'Tertiary': HealthCenterLevel.TERTIARY,
} as const

/**
 * Array para validación Zod
 */
export const HealthCenterLevelArray = Object.values(HealthCenterLevel) as [HealthCenterLevel, ...HealthCenterLevel[]]

// ========================================
// USER ROLES
// ========================================

export const UserRoleObject = {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  RECEPTIONIST: 'RECEPTIONIST',
  PATIENT: 'PATIENT',
  PHARMACIST: 'PHARMACIST',
  TECHNICIAN: 'TECHNICIAN',
  LABORATORY_STAFF: 'LABORATORY_STAFF',
  RADIOLOGIST: 'RADIOLOGIST',
  SOCIAL_WORKER: 'SOCIAL_WORKER',
} as const

export const UserRoleArray = Object.values(UserRoleObject) as unknown as [string, ...string[]]

export type UserRoleType = typeof UserRoleObject[keyof typeof UserRoleObject]
