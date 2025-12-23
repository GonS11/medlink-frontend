import {computed} from 'vue'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {hasPermission, type Permission} from '@shared/config/permissions.config'

/**
 * Composable para verificar permisos del usuario actual
 */
export function usePermissions() {
  const authStore = useAuthStore()

  const can = (permission: Permission): boolean => {
    const role = authStore.userRole
    if (!role) return false
    return hasPermission(role, permission)
  }

  const canComputed = (permission: Permission) => {
    return computed(() => can(permission))
  }

  const canAll = (...permissions: Permission[]): boolean => {
    return permissions.every(permission => can(permission))
  }

  const canAny = (...permissions: Permission[]): boolean => {
    return permissions.some(permission => can(permission))
  }

  return {
    can,
    canComputed,
    canAll,
    canAny,
  }
}
