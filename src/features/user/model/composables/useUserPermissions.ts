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
   * Verifica si puede editar un usuario específico
   * Regla: RECEPTIONIST solo puede editar PATIENT
   */
  const canEditUser = (targetUserRole: UserRoleType): boolean => {
    // Si no tiene permiso general, no puede editar a nadie
    if (!canEditUsers.value) return false

    // ADMIN puede editar todos
    if (isAdmin.value) return true

    // RECEPTIONIST solo puede editar PATIENT
    if (isReceptionist.value) {
      return targetUserRole === 'PATIENT'
    }

    return false
  }

  /**
   * Verifica si puede eliminar un usuario específico
   * Regla: Solo ADMIN puede eliminar, pero no puede eliminar otros ADMIN
   */
  const canDeleteUser = (targetUserRole: UserRoleType): boolean => {
    // Si no tiene permiso general, no puede eliminar a nadie
    if (!canDeleteUsers.value) return false

    // No permitir eliminar otros ADMIN (protección adicional)
    return targetUserRole !== 'ADMIN';
  }

  /**
   * Verifica si puede bloquear un usuario específico
   * Regla: No se puede bloquear a otros ADMIN
   */
  const canLockUser = (targetUserRole: UserRoleType): boolean => {
    // Si no tiene permiso general, no puede bloquear a nadie
    if (!canLockUsers.value) return false

    // No permitir bloquear otros ADMIN
    return targetUserRole !== 'ADMIN';


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
  }
}
