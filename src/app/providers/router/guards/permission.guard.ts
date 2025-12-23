import type {NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {hasPermission, hasAllPermissions, hasAnyPermission, type Permission} from '@shared/config/permissions.config'
import {ROUTES} from '@shared/constants/routes.constants'

/**
 * Guard que verifica un permiso antes de acceder a una ruta
 */
export function createPermissionGuard(requiredPermission: Permission) {
  return (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()
    const role = authStore.userRole

    if (!role) {
      next({path: ROUTES.LOGIN})
      return
    }

    if (hasPermission(role, requiredPermission)) {
      next()
    } else {
      console.warn(`Access denied: User role ${role} lacks permission ${requiredPermission}`)
      next({path: ROUTES.DASHBOARD})
    }
  }
}

/**
 * Guard que verifica múltiples permisos (requiere TODOS)
 */
export function createPermissionsGuard(requiredPermissions: Permission[]) {
  return (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()
    const role = authStore.userRole

    if (!role) {
      next({path: ROUTES.LOGIN})
      return
    }

    if (hasAllPermissions(role, requiredPermissions)) {
      next()
    } else {
      console.warn(`Access denied: User role ${role} lacks required permissions`, requiredPermissions)
      next({path: ROUTES.DASHBOARD})
    }
  }
}

/**
 * Guard que verifica al menos un permiso (requiere AL MENOS UNO)
 */
export function createAnyPermissionGuard(requiredPermissions: Permission[]) {
  return (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()
    const role = authStore.userRole

    if (!role) {
      next({path: ROUTES.LOGIN})
      return
    }

    if (hasAnyPermission(role, requiredPermissions)) {
      next()
    } else {
      console.warn(`Access denied: User role ${role} lacks any required permission`, requiredPermissions)
      next({path: ROUTES.DASHBOARD})
    }
  }
}

/**
 * Guard que verifica rol específico
 */
export function createRoleGuard(allowedRoles: string | string[]) {
  return (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore()
    const role = authStore.userRole

    if (!role) {
      next({path: ROUTES.LOGIN})
      return
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles]

    if (roles.includes(role)) {
      next()
    } else {
      console.warn(`Access denied: User role ${role} not in allowed roles`, roles)
      next({path: ROUTES.DASHBOARD})
    }
  }
}
