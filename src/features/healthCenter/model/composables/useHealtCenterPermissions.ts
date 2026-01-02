import {computed} from 'vue'
import {usePermissions} from '@shared/composables/usePermissions'
import {useRole} from '@shared/composables/useUserRole'

export function useHealthCenterPermissions() {
  const {can} = usePermissions()
  const {isAdmin, isDoctor, isNurse} = useRole()

  const canViewHealthCenters = computed(() => can('healthCenters.view'))
  const canManageHealthCenters = computed(() => can('healthCenters.manage'))

  /**
   * Verifica si puede crear un centro de salud
   * Regla: Solo ADMIN puede crear centros
   */
  const canCreateHealthCenter = (): boolean => {
    return canManageHealthCenters.value && isAdmin.value
  }

  /**
   * Verifica si puede editar un centro de salud específico
   * @param healthCenterId - ID del centro (opcional para futuras validaciones)
   */
  const canEditHealthCenter = (healthCenterId?: number): boolean => {
    if (!canManageHealthCenters.value) return false
    if (isAdmin.value) return true

    // TODO: Aquí se podría añadir lógica para verificar si el usuario
    // es gestor del centro específico cuando se implemente esa funcionalidad
    // if (healthCenterId && isHealthCenterManager(healthCenterId)) return true

    return false
  }

  /**
   * Verifica si puede eliminar un centro de salud
   * @param healthCenterId - ID del centro (opcional para futuras validaciones)
   */
  const canDeleteHealthCenter = (healthCenterId?: number): boolean => {
    if (!canManageHealthCenters.value) return false

    // Solo ADMIN puede eliminar
    // TODO: Validar si tiene pacientes activos, citas programadas, etc.
    return isAdmin.value
  }

  /**
   * Verifica si puede ver detalles sensibles del centro
   */
  const canViewSensitiveHealthCenterData = (): boolean => {
    return isAdmin.value
  }

  /**
   * Verifica si puede asignar personal al centro
   */
  const canAssignStaffToHealthCenter = (): boolean => {
    return canManageHealthCenters.value && isAdmin.value
  }

  /**
   * Verifica si puede gestionar departamentos del centro
   * @param healthCenterId - ID del centro (opcional para futuras validaciones)
   */
  const canManageDepartments = (healthCenterId?: number): boolean => {
    return isAdmin.value
  }

  /**
   * Verifica si puede ver estadísticas del centro
   * @param healthCenterId - ID del centro (opcional para futuras validaciones)
   */
  const canViewHealthCenterStatistics = (healthCenterId?: number): boolean => {
    return true
  }

  /**
   * Verifica si puede exportar datos del centro
   */
  const canExportHealthCenterData = (): boolean => {
    return isAdmin.value
  }

  /**
   * Verifica si puede configurar servicios del centro
   */
  const canConfigureHealthCenterServices = (): boolean => {
    return canManageHealthCenters.value && isAdmin.value
  }

  /**
   * Verifica si puede gestionar acreditaciones
   */
  const canManageAccreditations = (): boolean => {
    return canManageHealthCenters.value && isAdmin.value
  }

  /**
   * Verifica si puede ver información operacional
   */
  const canViewOperationalInfo = (): boolean => {
    if (isAdmin.value || isDoctor.value || isNurse.value) return true
    return canViewHealthCenters.value
  }

  return {
    // Permisos generales
    canViewHealthCenters,
    canManageHealthCenters,

    // Permisos específicos con lógica de negocio
    canCreateHealthCenter,
    canEditHealthCenter,
    canDeleteHealthCenter,
    canViewSensitiveHealthCenterData,
    canAssignStaffToHealthCenter,
    canManageDepartments,
    canViewHealthCenterStatistics,
    canExportHealthCenterData,
    canConfigureHealthCenterServices,
    canManageAccreditations,
    canViewOperationalInfo,
  }
}
