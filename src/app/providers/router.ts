import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {ROUTES} from '@shared/constants/app.constants'
import {UserRoleType} from '@shared/types/api.types'

// ============================================================================
// PUBLIC PAGES
// ============================================================================
const LoginPage = () => import('@pages/public/LoginPage/LoginPage.vue')
const RegisterPage = () => import('@pages/public/RegisterPage/RegisterPage.vue')

// ============================================================================
// COMMON PAGES (todos los roles autenticados)
// ============================================================================
const DashboardPage = () => import('@pages/common/DashboardPage/DashboardPage.vue')
const ProfilePage = () => import('@pages/common/ProfilePage/ProfilePage.vue')
const SettingsPage = () => import('@pages/common/SettingsPage/SettingsPage.vue')

// ============================================================================
// ADMIN PAGES
// ============================================================================
const AdminUsersPage = () => import('@pages/admin/UsersPage/UsersPage.vue')
const AdminHealthCentersPage = () => import('@pages/admin/HealthCentersPage/HealthCentersPage.vue')
const AdminDepartmentsPage = () => import('@pages/admin/DepartmentsPage/DepartmentsPage.vue')
const AdminSpecialtiesPage = () => import('@pages/admin/SpecialtiesPage/SpecialtiesPage.vue')
const AdminReportsPage = () => import('@pages/admin/ReportsPage/ReportsPage.vue')
const AdminAuditPage = () => import('@pages/admin/AuditPage/AuditPage.vue')

/*
// ============================================================================
// DOCTOR PAGES
// ============================================================================
const DoctorAppointmentsPage = () => import('@pages/doctor/AppointmentsPage/AppointmentsPage.vue')
const DoctorPatientsPage = () => import('@pages/doctor/PatientsPage/PatientsPage.vue')
const DoctorMedicalRecordsPage = () => import('@pages/doctor/MedicalRecordsPage/MedicalRecordsPage.vue')
const DoctorPrescriptionsPage = () => import('@pages/doctor/PrescriptionsPage/PrescriptionsPage.vue')
const DoctorLabTestsPage = () => import('@pages/doctor/LabTestsPage/LabTestsPage.vue')
const DoctorReferralsPage = () => import('@pages/doctor/ReferralsPage/ReferralsPage.vue')
const DoctorSchedulePage = () => import('@pages/doctor/SchedulePage/SchedulePage.vue')
const DoctorShiftsPage = () => import('@pages/doctor/ShiftsPage/ShiftsPage.vue')

// ============================================================================
// NURSE PAGES
// ============================================================================
const NursePatientCarePage = () => import('@pages/nurse/PatientCarePage/PatientCarePage.vue')
const NurseVitalSignsPage = () => import('@pages/nurse/VitalSignsPage/VitalSignsPage.vue')
const NurseVaccinationsPage = () => import('@pages/nurse/VaccinationsPage/VaccinationsPage.vue')
const NurseMedicationAdminPage = () => import('@pages/nurse/MedicationAdminPage/MedicationAdminPage.vue')
const NurseShiftsPage = () => import('@pages/nurse/ShiftsPage/ShiftsPage.vue')

// ============================================================================
// PATIENT PAGES
// ============================================================================
const PatientAppointmentsPage = () => import('@pages/patient/AppointmentsPage/AppointmentsPage.vue')
const PatientMedicalHistoryPage = () => import('@pages/patient/MedicalHistoryPage/MedicalHistoryPage.vue')
const PatientPrescriptionsPage = () => import('@pages/patient/PrescriptionsPage/PrescriptionsPage.vue')
const PatientTestResultsPage = () => import('@pages/patient/TestResultsPage/TestResultsPage.vue')

// ============================================================================
// RECEPTIONIST PAGES
// ============================================================================
const ReceptionistAppointmentsPage = () => import('@pages/receptionist/AppointmentsPage/AppointmentsPage.vue')
const ReceptionistCheckInPage = () => import('@pages/receptionist/CheckInPage/CheckInPage.vue')
const ReceptionistPatientsPage = () => import('@pages/receptionist/PatientsPage/PatientsPage.vue')
 */

// ============================================================================
// ROUTE META TYPE
// ============================================================================
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    hideForAuth?: boolean
    roles?: UserRoleType[]
  }
}

// ============================================================================
// ROUTES
// ============================================================================
const routes: RouteRecordRaw[] = [
  // Root redirect
  {
    path: '/',
    redirect: ROUTES.DASHBOARD,
  },

  // ============================================================================
  // PUBLIC ROUTES
  // ============================================================================
  {
    path: ROUTES.LOGIN,
    name: 'Login',
    component: LoginPage,
    meta: {requiresAuth: false, hideForAuth: true},
  },
  {
    path: ROUTES.REGISTER,
    name: 'Register',
    component: RegisterPage,
    meta: {requiresAuth: false, hideForAuth: true},
  },

  // ============================================================================
  // COMMON ROUTES (todos los roles autenticados)
  // ============================================================================
  {
    path: ROUTES.DASHBOARD,
    name: 'Dashboard',
    component: DashboardPage,
    meta: {requiresAuth: true},
  },
  {
    path: ROUTES.PROFILE,
    name: 'Profile',
    component: ProfilePage,
    meta: {requiresAuth: true},
  },
  {
    path: ROUTES.SETTINGS,
    name: 'Settings',
    component: SettingsPage,
    meta: {requiresAuth: true},
  },

  // ============================================================================
  // ADMIN ROUTES
  // ============================================================================
  {
    path: ROUTES.ADMIN.USERS,
    name: 'AdminUsers',
    component: AdminUsersPage,
    meta: {requiresAuth: true, roles: ['ADMIN']},
  },
  {
    path: ROUTES.ADMIN.HEALTH_CENTERS,
    name: 'AdminHealthCenters',
    component: AdminHealthCentersPage,
    meta: {requiresAuth: true, roles: ['ADMIN']},
  },
  {
    path: ROUTES.ADMIN.DEPARTMENTS,
    name: 'AdminDepartments',
    component: AdminDepartmentsPage,
    meta: {requiresAuth: true, roles: ['ADMIN']},
  },
  {
    path: ROUTES.ADMIN.SPECIALTIES,
    name: 'AdminSpecialties',
    component: AdminSpecialtiesPage,
    meta: {requiresAuth: true, roles: ['ADMIN']},
  },
  {
    path: ROUTES.ADMIN.REPORTS,
    name: 'AdminReports',
    component: AdminReportsPage,
    meta: {requiresAuth: true, roles: ['ADMIN']},
  },
  {
    path: ROUTES.ADMIN.AUDIT,
    name: 'AdminAudit',
    component: AdminAuditPage,
    meta: {requiresAuth: true, roles: ['ADMIN']},
  },

  /*
  // ============================================================================
  // DOCTOR ROUTES
  // ============================================================================
  {
    path: ROUTES.DOCTOR.APPOINTMENTS,
    name: 'DoctorAppointments',
    component: DoctorAppointmentsPage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },
  {
    path: ROUTES.DOCTOR.PATIENTS,
    name: 'DoctorPatients',
    component: DoctorPatientsPage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },
  {
    path: ROUTES.DOCTOR.MEDICAL_RECORDS,
    name: 'DoctorMedicalRecords',
    component: DoctorMedicalRecordsPage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },
  {
    path: ROUTES.DOCTOR.PRESCRIPTIONS,
    name: 'DoctorPrescriptions',
    component: DoctorPrescriptionsPage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },
  {
    path: ROUTES.DOCTOR.LAB_TESTS,
    name: 'DoctorLabTests',
    component: DoctorLabTestsPage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },
  {
    path: ROUTES.DOCTOR.REFERRALS,
    name: 'DoctorReferrals',
    component: DoctorReferralsPage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },
  {
    path: ROUTES.DOCTOR.SCHEDULE,
    name: 'DoctorSchedule',
    component: DoctorSchedulePage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },
  {
    path: ROUTES.DOCTOR.SHIFTS,
    name: 'DoctorShifts',
    component: DoctorShiftsPage,
    meta: {requiresAuth: true, roles: ['DOCTOR']},
  },

  // ============================================================================
  // NURSE ROUTES
  // ============================================================================
  {
    path: ROUTES.NURSE.PATIENT_CARE,
    name: 'NursePatientCare',
    component: NursePatientCarePage,
    meta: {requiresAuth: true, roles: ['NURSE']},
  },
  {
    path: ROUTES.NURSE.VITAL_SIGNS,
    name: 'NurseVitalSigns',
    component: NurseVitalSignsPage,
    meta: {requiresAuth: true, roles: ['NURSE']},
  },
  {
    path: ROUTES.NURSE.VACCINATIONS,
    name: 'NurseVaccinations',
    component: NurseVaccinationsPage,
    meta: {requiresAuth: true, roles: ['NURSE']},
  },
  {
    path: ROUTES.NURSE.MEDICATION_ADMIN,
    name: 'NurseMedicationAdmin',
    component: NurseMedicationAdminPage,
    meta: {requiresAuth: true, roles: ['NURSE']},
  },
  {
    path: ROUTES.NURSE.SHIFTS,
    name: 'NurseShifts',
    component: NurseShiftsPage,
    meta: {requiresAuth: true, roles: ['NURSE']},
  },

  // ============================================================================
  // PATIENT ROUTES
  // ============================================================================
  {
    path: ROUTES.PATIENT.APPOINTMENTS,
    name: 'PatientAppointments',
    component: PatientAppointmentsPage,
    meta: {requiresAuth: true, roles: ['PATIENT']},
  },
  {
    path: ROUTES.PATIENT.MEDICAL_HISTORY,
    name: 'PatientMedicalHistory',
    component: PatientMedicalHistoryPage,
    meta: {requiresAuth: true, roles: ['PATIENT']},
  },
  {
    path: ROUTES.PATIENT.PRESCRIPTIONS,
    name: 'PatientPrescriptions',
    component: PatientPrescriptionsPage,
    meta: {requiresAuth: true, roles: ['PATIENT']},
  },
  {
    path: ROUTES.PATIENT.TEST_RESULTS,
    name: 'PatientTestResults',
    component: PatientTestResultsPage,
    meta: {requiresAuth: true, roles: ['PATIENT']},
  },

  // ============================================================================
  // RECEPTIONIST ROUTES
  // ============================================================================
  {
    path: ROUTES.RECEPTIONIST.APPOINTMENTS,
    name: 'ReceptionistAppointments',
    component: ReceptionistAppointmentsPage,
    meta: {requiresAuth: true, roles: ['RECEPTIONIST']},
  },
  {
    path: ROUTES.RECEPTIONIST.CHECK_IN,
    name: 'ReceptionistCheckIn',
    component: ReceptionistCheckInPage,
    meta: {requiresAuth: true, roles: ['RECEPTIONIST']},
  },
  {
    path: ROUTES.RECEPTIONIST.PATIENTS,
    name: 'ReceptionistPatients',
    component: ReceptionistPatientsPage,
    meta: {requiresAuth: true, roles: ['RECEPTIONIST']},
  },
  */


  // ============================================================================
  // 404
  // ============================================================================
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTES.DASHBOARD,
  },
]

// ============================================================================
// ROUTER INSTANCE
// ============================================================================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// ============================================================================
// NAVIGATION GUARDS
// ============================================================================
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const {requiresAuth, hideForAuth, roles} = to.meta

  // 1. Redirect if user is authenticated (for login/register)
  if (hideForAuth && authStore.isAuthenticated) {
    return next(ROUTES.DASHBOARD)
  }

  // 2. Redirect if route requires auth and user is not logged in
  if (requiresAuth && !authStore.isAuthenticated) {
    return next(ROUTES.LOGIN)
  }

  // 3. Role-based access control
  if (requiresAuth && roles && roles.length > 0) {
    const userRole = authStore.userRole

    if (userRole && !roles.includes(userRole)) {
      // Redirect to dashboard if user doesn't have permission
      return next(ROUTES.DASHBOARD)
    }
  }

  // 4. Continue navigation
  next()
})

export default router
