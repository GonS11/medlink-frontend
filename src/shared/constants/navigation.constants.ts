import type {Component} from 'vue'
import type {UserRole, Permission} from '@shared/types/permissions.types'
import {ROUTES} from "@shared/constants/routes.constants.ts";
import DashboardIcon from "@shared/ui/icons/DashboardIcon.vue";
import UsersIcon from "@shared/ui/icons/UsersIcon.vue";
import HealthCareCenterIcon from "@shared/ui/icons/HealthCareCenterIcon.vue";
import DepartmentIcon from "@shared/ui/icons/DepartmentIcon.vue";
import MedicalSimbolIcon from "@shared/ui/icons/MedicalSimbolIcon.vue";
import ProfileIcon from "@shared/ui/icons/ProfileIcon.vue";
import SettingsIcon from "@shared/ui/icons/SettingsIcon.vue";

export interface NavigationItem {
  id: string
  route: string
  label: string
  icon: Component | null
  roles?: UserRole[]
  permissions?: Permission[]
  requireAll?: boolean
  badge?: string | number
  children?: NavigationItem[]
  isDivider?: boolean
}

/**
 * Items de navegación principal (sidebar superior)
 * SOLO incluye las rutas que existen en app.constants.ts
 */
export const MAIN_NAV_ITEMS: NavigationItem[] = [
  // === DASHBOARD (todos) ===
  {
    id: 'dashboard',
    route: ROUTES.DASHBOARD,
    label: 'nav.items.dashboard',
    icon: DashboardIcon,
    permissions: ['users.view', 'appointments.view', 'medicalRecords.view'],
    requireAll: false, // Al menos uno
  },

  // === DIVISOR ANTES DE ADMINISTRACIÓN ===
  {
    id: 'divider-admin',
    route: '',
    label: 'divider',
    icon: null,
    isDivider: true,
    permissions: ['users.view', 'healthCenters.view', 'departments.view', 'medicalSpeciality.view'],
    requireAll: false, // Mostrar si tiene AL MENOS uno de estos permisos
  },

  // === USUARIOS (solo admin) ===
  {
    id: 'users',
    route: ROUTES.USERS,
    label: 'nav.items.users',
    icon: UsersIcon,
    permissions: ['users.view'],
  },

  // === CENTROS DE SALUD (admin) ===
  {
    id: 'healthCenters',
    route: ROUTES.HEALTH_CENTERS,
    label: 'nav.items.healthCenters',
    icon: HealthCareCenterIcon,
    permissions: ['healthCenters.view'],
  },

  // === DEPARTAMENTOS (admin) ===
  {
    id: 'departments',
    route: ROUTES.DEPARTMENTS,
    label: 'nav.items.departments',
    icon: DepartmentIcon,
    permissions: ['departments.view'],
  },

  // === ESPECIALIDADES (admin) ===
  {
    id: 'medicalSpecialities',
    route: ROUTES.SPECIALTIES,
    label: 'nav.items.medicalSpecialities',
    icon: MedicalSimbolIcon,
    permissions: ['medicalSpeciality.view'],
  },
]

/**
 * Items de navegación del footer (sidebar inferior)
 * Elementos de cuenta y configuración
 */
export const FOOTER_NAV_ITEMS: NavigationItem[] = [
  // === PERFIL (todos) ===
  {
    id: 'profile',
    route: ROUTES.PROFILE,
    label: 'nav.items.profile',
    icon: ProfileIcon,
    permissions: ['users.view', 'appointments.view', 'medicalRecords.view'],
    requireAll: false, // Al menos uno (todos pueden ver su perfil)
  },

  // === CONFIGURACIÓN (todos) ===
  {
    id: 'settings',
    route: ROUTES.SETTINGS,
    label: 'nav.items.settings',
    icon: SettingsIcon,
    permissions: ['users.view', 'appointments.view', 'medicalRecords.view'],
    requireAll: false, // Al menos uno (todos pueden ver configuración)
  },
]

/**
 * Navegación futura con estructura jerárquica
 * Para cuando se necesiten submenús más complejos
 *
 * NOTA: Estas rutas están comentadas porque no existen en app.constants.ts
 * Cuando las agregues, descomenta las secciones correspondientes
 */
export const FUTURE_NAV_ITEMS: NavigationItem[] = [
  // === CITAS (médicos, enfermeras, recepcionistas) ===
  // Agregar a app.constants.ts: APPOINTMENTS: '/appointments'
  // {
  //   id: 'appointments',
  //   route: ROUTES.APPOINTMENTS,
  //   label: 'nav.items.appointments',
  //   icon: AppointmentIcon,
  //   permissions: ['appointments.view'],
  // },

  // === HISTORIALES MÉDICOS (personal médico) ===
  // Agregar a app.constants.ts: MEDICAL_RECORDS: '/medical-records'
  // {
  //   id: 'medicalRecords',
  //   route: ROUTES.MEDICAL_RECORDS,
  //   label: 'nav.items.medicalRecords',
  //   icon: MedicalRecordIcon,
  //   permissions: ['medicalRecords.view'],
  // },

  // === PRESCRIPCIONES (médicos, enfermeras, farmacéuticos) ===
  // Agregar a app.constants.ts: PRESCRIPTIONS: '/prescriptions'
  // {
  //   id: 'prescriptions',
  //   route: ROUTES.PRESCRIPTIONS,
  //   label: 'nav.items.prescriptions',
  //   icon: PrescriptionIcon,
  //   permissions: ['prescriptions.view'],
  // },

  // === VACUNACIÓN (médicos, enfermeras) ===
  // Agregar a app.constants.ts: VACCINATIONS: '/vaccinations'
  // {
  //   id: 'vaccinations',
  //   route: ROUTES.VACCINATIONS,
  //   label: 'nav.items.vaccinations',
  //   icon: VaccinationIcon,
  //   permissions: ['vaccinations.view'],
  // },

  // === TURNOS (todos excepto pacientes) ===
  // Agregar a app.constants.ts: SHIFTS: '/shifts'
  // {
  //   id: 'shifts',
  //   route: ROUTES.SHIFTS,
  //   label: 'nav.items.shifts',
  //   icon: ShiftIcon,
  //   permissions: ['shifts.view'],
  // },
]
