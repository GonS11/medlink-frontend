import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {ROUTES, PUBLIC_ROUTES, DEFAULT_ROUTE_BY_ROLE} from '@shared/constants/routes.constants'
import {createPermissionGuard} from "@app/providers/router/guards/permission.guard.ts";
import AppLayout from "@shared/ui/components/layout/AppLayout/AppLayout.vue";


const routes: RouteRecordRaw[] = [
  // === RUTAS PÚBLICAS ===
  {
    path: ROUTES.LOGIN,
    name: 'Login',
    component: () => import('@pages/public/LoginPage/LoginPage.vue'),
    meta: {requiresAuth: false, layout: 'auth'},
  },
  {
    path: ROUTES.REGISTER,
    name: 'Register',
    component: () => import('@pages/public/RegisterPage/RegisterPage.vue'),
    meta: {requiresAuth: false, layout: 'auth'},
  },

  // === RUTAS PROTEGIDAS ===
  {
    path: '/',
    component: AppLayout,
    meta: {requiresAuth: true},
    children: [
      {
        path: '',
        redirect: {name: 'Dashboard'}
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@pages/common/DashboardPage/DashboardPage.vue'),
        beforeEnter: createPermissionGuard('dashboard.view'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@pages/common/ProfilePage/ProfilePage.vue'),
        beforeEnter: createPermissionGuard('profile.view'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@pages/common/SettingsPage/SettingsPage.vue'),
        beforeEnter: createPermissionGuard('settings.view'),
      },

      // === USUARIOS ===
      {
        path: 'users',
        name: 'Users',
        component: () => import('@pages/common/Users/UsersPage/UsersPage.vue'),
        beforeEnter: createPermissionGuard('users.view'),
      },
      {
        path: 'users/:id',
        name: 'UserDetail',
        component: () => import('@pages/common/Users/UserDetailPage/UserDetailPage.vue'),
        beforeEnter: createPermissionGuard('users.view'),
      },

      // === CENTROS DE SALUD (solo admin) ===
      {
        path: ROUTES.HEALTH_CENTERS,
        name: 'HealthCenters',
        component: () => import('@pages/common/HealthCenter/HealthCenterPage/HealthCenterPage.vue'),
        meta: {
          requiresAuth: true,
        },
        beforeEnter: createPermissionGuard('healthCenters.view'),
      },
      {
        path: 'health-centers/:id',
        name: 'HealthCenterDetail',
        component: () => import('@pages/common/HealthCenter/HealthCenterDetailPage/HealthCenterDetailPage.vue'),
        beforeEnter: createPermissionGuard('healthCenters.view'),
      },

      // === DEPARTAMENTOS (solo admin) ===
      {
        path: ROUTES.DEPARTMENTS,
        name: 'Departments',
        component: () => import('@pages/admin/DepartmentsPage/DepartmentsPage.vue'),
        meta: {
          requiresAuth: true,
        },
        beforeEnter: createPermissionGuard('departments.view'),
      },

      // === ESPECIALIDADES (solo admin) ===
      {
        path: ROUTES.SPECIALTIES,
        name: 'MedicalSpeciality',
        component: () => import('@pages/common/MedicalSpecialtiesPage/MedicalSpecialitiesPage.vue'),
        meta: {
          requiresAuth: true,
        },
        beforeEnter: createPermissionGuard('medicalRecords.view'),
      },

      // === RUTAS FUTURAS (Comentadas - Descomentar cuando implementes) ===

      // --- Citas ---
      // {
      //   path: ROUTES.APPOINTMENTS,
      //   name: 'Appointments',
      //   component: () => import('@pages/appointments/AppointmentsPage.vue'),
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   beforeEnter: createPermissionGuard('appointments.view'),
      // },

      // --- Historiales Médicos ---
      // {
      //   path: ROUTES.MEDICAL_RECORDS,
      //   name: 'MedicalRecords',
      //   component: () => import('@pages/medical-records/MedicalRecordsPage.vue'),
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   beforeEnter: createPermissionGuard('medicalRecords.view'),
      // },

      // --- Prescripciones ---
      // {
      //   path: ROUTES.PRESCRIPTIONS,
      //   name: 'Prescriptions',
      //   component: () => import('@pages/prescriptions/PrescriptionsPage.vue'),
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   beforeEnter: createPermissionGuard('prescriptions.view'),
      // },

      // --- Ejemplo: Ruta que requiere TODOS los permisos ---
      // {
      //   path: '/admin/users/create',
      //   name: 'UsersCreate',
      //   component: () => import('@pages/users/UsersCreatePage.vue'),
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   beforeEnter: createPermissionsGuard(['users.view', 'users.manage']),
      // },

      // --- Ejemplo: Ruta que requiere AL MENOS UNO de los permisos ---
      // {
      //   path: '/clinical',
      //   name: 'Clinical',
      //   component: () => import('@pages/clinical/ClinicalPage.vue'),
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   beforeEnter: createAnyPermissionGuard(['appointments.view', 'medicalRecords.view']),
      // },

      // --- Ejemplo: Ruta solo para ciertos roles ---
      // {
      //   path: '/admin/system',
      //   name: 'System',
      //   component: () => import('@pages/admin/SystemPage.vue'),
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   beforeEnter: createRoleGuard('ADMIN'),
      // },
    ]
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    redirect: {name: 'Dashboard'},
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || {top: 0}
  },
})

/**
 * Guard de navegación global
 */
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth !== false)

  if (requiresAuth && !isAuthenticated) {
    return next({
      path: ROUTES.LOGIN,
      query: {redirect: to.fullPath},
    })
  }

  if (isAuthenticated && PUBLIC_ROUTES.includes(to.path as any)) {
    const userRole = authStore.userRole
    const defaultRoute = userRole
      ? DEFAULT_ROUTE_BY_ROLE[userRole as keyof typeof DEFAULT_ROUTE_BY_ROLE]
      : ROUTES.DASHBOARD
    return next(defaultRoute)
  }

  next()
})

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    layout?: 'default' | 'auth' | 'error' | 'admin'
  }
}
