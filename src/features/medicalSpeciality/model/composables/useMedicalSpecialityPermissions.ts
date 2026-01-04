import {computed} from 'vue'
import {usePermissions} from '@shared/composables/usePermissions'
import {useRole} from '@shared/composables/useUserRole'

export function useMedicalSpecialityPermissions() {
  const {can} = usePermissions()
  const {isAdmin, isDoctor} = useRole()

  const canViewMedicalSpecialities = computed(() => can('medicalSpeciality.view'))
  const canManageMedicalSpecialities = computed(() => can('medicalSpeciality.manage'))

  /**
   * Verifica si puede crear una especialidad médica
   * Regla: Solo ADMIN puede crear especialidades
   */
  const canCreateMedicalSpeciality = (): boolean => {
    return canManageMedicalSpecialities.value && isAdmin.value
  }

  /**
   * Verifica si puede editar una especialidad médica
   * @param specialityId - ID de la especialidad (opcional para futuras validaciones)
   */
  const canEditMedicalSpeciality = (specialityId?: number): boolean => {
    if (!canManageMedicalSpecialities.value) return false
    return isAdmin.value
  }

  /**
   * Verifica si puede eliminar una especialidad médica
   * @param specialityId - ID de la especialidad (opcional para futuras validaciones)
   */
  const canDeleteMedicalSpeciality = (specialityId?: number): boolean => {
    if (!canManageMedicalSpecialities.value) return false
    // Solo ADMIN puede eliminar
    // TODO: Validar si tiene doctores asignados antes de permitir eliminación
    return isAdmin.value
  }

  /**
   * Verifica si puede ver detalles completos de la especialidad
   */
  const canViewFullDetails = (): boolean => {
    return isAdmin.value || isDoctor.value
  }

  /**
   * Verifica si puede exportar datos de especialidades
   */
  const canExportMedicalSpecialityData = (): boolean => {
    return isAdmin.value
  }

  return {
    // Permisos generales
    canViewMedicalSpecialities,
    canManageMedicalSpecialities,

    // Permisos específicos con lógica de negocio
    canCreateMedicalSpeciality,
    canEditMedicalSpeciality,
    canDeleteMedicalSpeciality,
    canViewFullDetails,
    canExportMedicalSpecialityData,
  }
}
