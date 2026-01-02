import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import type {TableColumn} from '@shared/types/table.types'
import {useHealthCenterPermissions} from "@features/healthCenter/model/composables/useHealtCenterPermissions.ts";

export function useHealthCenterTableConfig() {
  const {t} = useI18n()
  const permissions = useHealthCenterPermissions()

  const allColumns = computed<Record<string, TableColumn>>(() => ({
    code: {
      key: 'code',
      label: t('fields.code'),
      width: '100px',
      sortable: true
    },
    name: {
      key: 'name',
      label: t('fields.name'),
      width: '250px',
      sortable: true
    },
    type: {
      key: 'type',
      label: t('fields.type'),
      width: '180px',
      sortable: true
    },
    level: {
      key: 'level',
      label: t('fields.level'),
      width: '120px',
      sortable: true
    },
    services: {
      key: 'hasEmergency',
      label: t('fields.services'),
      width: '150px',
      sortable: false,
      align: 'center'
    },
    isPublic: {
      key: 'isPublic',
      label: t('fields.type'),
      width: '120px',
      sortable: true,
      align: 'center'
    },
  }))

  /**
   * Columnas visibles según permisos
   * Mantiene la tabla limpia y enfocada en lo esencial
   */
  const visibleColumns = computed<TableColumn[]>(() => {
    const cols: TableColumn[] = []
    const defs = allColumns.value

    if (!permissions.canViewHealthCenters.value) {
      return cols
    }

    // Columnas básicas - todos pueden verlas
    cols.push(
      defs.code,      // Identificador único
      defs.name,      // Nombre del centro
      defs.type,      // Tipo de centro (hospital, CAP, etc.)
      defs.level,     // Nivel asistencial
    )

    // Servicios - para quien puede ver info operacional
    if (permissions.canViewOperationalInfo()) {
      cols.push(defs.services)  // Emergencia, UCI, Helipuerto
    }

    // Tipo de gestión - para quien gestiona
    if (permissions.canManageHealthCenters.value) {
      cols.push(defs.isPublic)  // Público/Privado
    }

    return cols
  })

  return {
    visibleColumns,
    allColumns,
  }
}
