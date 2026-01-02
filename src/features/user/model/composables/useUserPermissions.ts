import {computed} from 'vue'
import {usePermissions} from '@shared/composables/usePermissions'
import {useRole} from '@shared/composables/useUserRole'
import type {UserRoleType} from '@shared/types/enums.types'

export function useUserPermissions() {
  const {can} = usePermissions()
  const {isAdmin, isReceptionist} = useRole()

  // --- Permisos Básicos (delegados al sistema central) ---
  const canViewUsers = computed(() => can('users.view'))
  const canCreateUsers = computed(() => can('users.create'))
  const canEditUsers = computed(() => can('users.edit'))
  const canDeleteUsers = computed(() => can('users.delete'))
  const canLockUsers = computed(() => can('users.lock'))
  const canUnlockUsers = computed(() => can('users.unlock'))
  const canChangePassword = computed(() => can('users.changePassword'))
  const canViewSensitiveData = computed(() => can('users.viewSensitiveData'))

  // --- Permisos Específicos (lógica de negocio adicional) ---
  /**
   * Verifica si puede crear usuario con un rol específico
   * Regla: Solo ADMIN puede crear usuarios
   */
  const canCreateUserWithRole = (targetUserRole: UserRoleType): boolean => {
    if (!canCreateUsers.value) return false

    // ADMIN puede crear cualquier rol
    if (isAdmin.value) return true

    // RECEPTIONIST solo puede crear PATIENT
    if (isReceptionist.value) {
      return targetUserRole === 'PATIENT'
    }

    // Otros roles no pueden crear usuarios
    return false
  }

  /**
   * Verifica si puede editar un usuario específico
   * Reglas:
   * - ADMIN puede editar todos
   * - RECEPTIONIST solo puede editar PATIENT
   * - Otros roles: según permiso general
   */
  const canEditUser = (targetUserRole: UserRoleType): boolean => {
    if (!canEditUsers.value) return false

    if (isAdmin.value) return true

    if (isReceptionist.value) {
      return targetUserRole === 'PATIENT'
    }

    // Para otros roles con permiso general
    return true
  }

  /**
   * Verifica si puede eliminar un usuario específico
   * Reglas:
   * - Solo ADMIN puede eliminar
   * - ADMIN no puede eliminar otros ADMIN (protección)
   */
  const canDeleteUser = (targetUserRole: UserRoleType): boolean => {
    if (!canDeleteUsers.value) return false

    // No permitir eliminar otros ADMIN
    return targetUserRole !== 'ADMIN'
  }

  /**
   * Verifica si puede bloquear un usuario específico
   * Reglas:
   * - Solo ADMIN puede bloquear (según config)
   * - No se puede bloquear otros ADMIN
   */
  const canLockUser = (targetUserRole: UserRoleType): boolean => {
    if (!canLockUsers.value) return false

    return targetUserRole !== 'ADMIN'
  }

  /**
   * Verifica si puede desbloquear un usuario específico
   * Regla: Solo ADMIN puede desbloquear
   */
  const canUnlockUser = (targetUserRole: UserRoleType): boolean => {
    if (!canUnlockUsers.value) return false

    return targetUserRole !== 'ADMIN'
  }

  /**
   * Verifica si puede cambiar la contraseña de un usuario
   * Reglas:
   * - ADMIN puede cambiar a todos excepto otros ADMIN
   * - Usuarios pueden cambiar su propia contraseña (esto se maneja en el componente)
   */
  const canChangeUserPassword = (targetUserRole: UserRoleType): boolean => {
    if (!canChangePassword.value) return false

    if (isAdmin.value) {
      return targetUserRole !== 'ADMIN'
    }

    return false
  }

  return {
    // Permisos generales
    canViewUsers,
    canCreateUsers,
    canEditUsers,
    canDeleteUsers,
    canLockUsers,
    canUnlockUsers,
    canChangePassword,
    canViewSensitiveData,

    // Permisos específicos con lógica de negocio
    canEditUser,
    canDeleteUser,
    canLockUser,
    canUnlockUser,
    canChangeUserPassword,
    canCreateUserWithRole,
  }
}
