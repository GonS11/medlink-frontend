import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {ROUTES} from '@shared/constants/app.constants'
import {UserRoleType} from '@shared/types/api.types'

// Public pages
const LoginPage = () => import('@pages/Login/LoginPage.vue')
const RegisterPage = () => import('@pages/Login/RegisterPage.vue')

// Authenticated pages
const DashboardPage = () => import('@pages/Authenticated/Dashboard/DashboardPage.vue')
const ProfilePage = () => import('@pages/Authenticated/Profile/ProfilePage.vue')
const SettingsPage = () => import('@pages/Authenticated/Settings/SettingsPage.vue')
const UsersPage = () => import('@pages/Authenticated/Users/UsersPage.vue')
// Aquí deberías añadir páginas como Inventory, Appointments, Patients, etc.

// Extender RouteMeta para tipar los roles
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    hideForAuth?: boolean
    roles?: UserRoleType[] // Array de roles permitidos para acceder a esta ruta
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: ROUTES.DASHBOARD,
  },
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
  {
    path: ROUTES.USERS,
    name: 'Users',
    component: UsersPage,
    // Tipado con el UserRoleType
    meta: {requiresAuth: true, roles: ['ADMIN' as UserRoleType]},
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTES.DASHBOARD,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  const {requiresAuth, hideForAuth, roles} = to.meta

  // Paso 1: Redirigir si el usuario ya está autenticado (para login/register)
  if (hideForAuth && authStore.isAuthenticated) {
    return next(ROUTES.DASHBOARD)
  }

  // Paso 2: Redirigir si la ruta requiere autenticación y el usuario no está logueado
  if (requiresAuth && !authStore.isAuthenticated) {
    return next(ROUTES.LOGIN)
  }

  // Paso 3: Control de acceso basado en roles (Role Guard)
  if (requiresAuth && roles && roles.length > 0) {
    const userRole = authStore.userRole

    // Si el usuario tiene un rol y ese rol NO está incluido en los roles permitidos
    if (userRole && !roles.includes(userRole)) {
      // Redirigir a una página de acceso denegado o al dashboard
      return next(ROUTES.DASHBOARD)
    }
  }

  // Paso 4: Continuar la navegación si todas las comprobaciones pasan
  next()
})

export default router
