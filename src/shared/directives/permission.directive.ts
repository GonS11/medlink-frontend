import type {Directive, DirectiveBinding} from 'vue'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import type {UserRoleType} from '@shared/types/api.types'
import {ROLE_PERMISSIONS, type Permission} from '@shared/config/permissions.config'

/**
 * Directiva v-can
 * Muestra/oculta elementos según permisos del usuario
 *
 * Uso:
 * v-can="'users.view'" - Un solo permiso
 * v-can="['users.view', 'users.manage']" - Varios permisos (requiere al menos uno)
 * v-can.all="['users.view', 'users.manage']" - Varios permisos (requiere todos)
 */
export const vCan: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()

    if (!authStore.userRole) {
      el.style.display = 'none'
      return
    }

    const userRole = authStore.userRole as UserRoleType
    const rolePermissions = ROLE_PERMISSIONS[userRole]
    const requiredPermissions = Array.isArray(binding.value) ? binding.value : [binding.value]
    const requireAll = binding.modifiers.all === true

    const hasPermission = requireAll
      ? requiredPermissions.every((p: Permission) => rolePermissions?.[p] === true)
      : requiredPermissions.some((p: Permission) => rolePermissions?.[p] === true)

    if (!hasPermission) {
      el.style.display = 'none'
    }
  },
}

/**
 * Directiva v-role
 * Muestra/oculta elementos según rol del usuario
 *
 * Uso:
 * v-role="'ADMIN'" - Un solo rol
 * v-role="['ADMIN', 'DOCTOR']" - Varios roles
 */
export const vRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const authStore = useAuthStore()

    if (!authStore.userRole) {
      el.style.display = 'none'
      return
    }

    const userRole = authStore.userRole
    const allowedRoles = Array.isArray(binding.value) ? binding.value : [binding.value]

    if (!allowedRoles.includes(userRole)) {
      el.style.display = 'none'
    }
  },
}

/**
 * Plugin para registrar las directivas globalmente
 */
export default {
  install(app: any) {
    app.directive('can', vCan)
    app.directive('role', vRole)
  },
}
