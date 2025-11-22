import {computed} from 'vue';
import {UserRoleType} from '@shared/types/api.types';
import {useAuthStore} from "@entities/auth/model/store/auth.store.ts";

/**
 * Hook genérico para verificar el rol del usuario actual.
 * @returns Un objeto con la función hasRole y getters comunes.
 */
export function useRole() {
  const authStore = useAuthStore();

  const currentUserRole = computed(() => authStore.userRole);

  /**
   * Verifica si el rol del usuario actual coincide con el rol o roles dados.
   * @param requiredRoles - Un solo rol (string) o un array de roles a verificar.
   * @returns true si el usuario tiene al menos uno de los roles requeridos.
   */
  const hasRole = (requiredRoles: UserRoleType | UserRoleType[]): boolean => {
    const currentRole = currentUserRole.value;

    if (!currentRole) {
      return false;
    }

    const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // Convertimos a string (si el tipo no es string) y comparamos
    return rolesToCheck.some(role => role === currentRole);
  };

  // Getters comunes que usarán hasRole para mayor consistencia
  const isAdmin = computed(() => hasRole('ADMIN' as UserRoleType));
  const isDoctor = computed(() => hasRole('DOCTOR' as UserRoleType));
  const isNurse = computed(() => hasRole('NURSE' as UserRoleType));
  const isPatient = computed(() => hasRole('PATIENT' as UserRoleType));

  return {
    currentUserRole,
    hasRole,
    isAdmin,
    isDoctor,
    isNurse,
    isPatient,
  };
}
