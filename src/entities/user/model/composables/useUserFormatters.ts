import {computed, type Ref} from 'vue'
import {UserResponse} from "@entities/user/model/types/user.types.ts";
import {FormattedName, UserFormatters} from "@entities/user/model/types/user.composables.types.ts";


export function useUserFormatters(user: Ref<UserResponse>): UserFormatters {
  const formatFullName = computed<FormattedName>(() => ({
    main: user.value.fullName,
    secondary: user.value.secondLastName,
    initials: `${user.value.firstName[0]}${user.value.lastName[0]}`.toUpperCase(),
    full: user.value.secondLastName
      ? `${user.value.firstName} ${user.value.lastName} ${user.value.secondLastName}`
      : user.value.fullName
  }))

  const formatRole = computed(() => user.value.role.toLowerCase())

  const isActive = computed(() => user.value.isActive)

  const isLocked = computed(() => user.value.isAccountLocked ?? false)

  const hasSecondLastName = computed(() => !!user.value.secondLastName)

  return {
    formatFullName,
    formatRole,
    isActive,
    isLocked,
    hasSecondLastName,
  }
}

/**
 * Versión estática para usar sin ref (en templates o transformaciones)
 */
export const userFormattersStatic = {
  formatFullName: (user: UserResponse): FormattedName => ({
    main: user.fullName,
    secondary: user.secondLastName,
    initials: `${user.firstName[0]}${user.lastName[0]}`.toUpperCase(),
    full: user.secondLastName
      ? `${user.firstName} ${user.lastName} ${user.secondLastName}`
      : user.fullName
  }),

  formatRole: (user: UserResponse): string => user.role.toLowerCase(),

  isActive: (user: UserResponse): boolean => user.isActive,

  isLocked: (user: UserResponse): boolean => user.isAccountLocked ?? false,
}
