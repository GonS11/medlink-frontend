import {computed} from 'vue';
import {useAuthStore} from "@entities/auth/model/store/auth.store.ts";
import {UserRoleType} from "@shared/types/enums.types.ts";

export function useRole() {
  const authStore = useAuthStore();
  const currentUserRole = computed(() => authStore.userRole);

  const hasRole = (requiredRoles: UserRoleType | UserRoleType[]): boolean => {
    const currentRole = currentUserRole.value;

    if (!currentRole) {
      return false;
    }

    const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    return rolesToCheck.some(role => role === currentRole);
  };

  const isAdmin = computed(() => hasRole('ADMIN' as UserRoleType));
  const isDoctor = computed(() => hasRole('DOCTOR' as UserRoleType));
  const isNurse = computed(() => hasRole('NURSE' as UserRoleType));
  const isReceptionist = computed(() => hasRole('RECEPTIONIST' as UserRoleType));
  const isPatient = computed(() => hasRole('PATIENT' as UserRoleType));
  const isPharmacist = computed(() => hasRole('PHARMACIST' as UserRoleType));
  const isTechnician = computed(() => hasRole('TECHNICIAN' as UserRoleType));
  const isLaboratoryStaff = computed(() => hasRole('LABORATORY_STAFF' as UserRoleType));
  const isRadiologist = computed(() => hasRole('RADIOLOGIST' as UserRoleType));
  const isSocialWorker = computed(() => hasRole('SOCIAL_WORKER' as UserRoleType));

  return {
    currentUserRole,
    hasRole,
    isAdmin,
    isDoctor,
    isNurse,
    isReceptionist,
    isPatient,
    isPharmacist,
    isTechnician,
    isLaboratoryStaff,
    isRadiologist,
    isSocialWorker,
  };
}
