import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {usePermissions} from '@shared/composables/usePermissions'
import type {TableColumn} from '@shared/types/table.types'

export function useUserTableConfig() {
  const {t} = useI18n()
  const {can} = usePermissions()

  // --- Todas las columnas disponibles ---
  const allColumns = computed<Record<string, TableColumn>>(() => ({
    id: {
      key: 'id',
      label: t('fields.id'),
      width: '80px',
      sortable: true,
    },
    fullName: {
      key: 'fullName',
      label: t('fields.name'),
      sortable: true,
    },
    email: {
      key: 'email',
      label: t('fields.email'),
      sortable: true,
    },
    role: {
      key: 'role',
      label: t('fields.role'),
      width: '140px',
      sortable: true,
    },
    phone: {
      key: 'phone',
      label: t('fields.phone'),
      width: '140px',
      sortable: false,
    },
    isActive: {
      key: 'isActive',
      label: t('fields.status'),
      width: '160px',
      sortable: false,
    }
  }))

  // --- Columnas visibles según permisos ---
  const visibleColumns = computed<TableColumn[]>(() => {
    const cols: TableColumn[] = []
    const defs = allColumns.value

    // ID: Solo con users.viewSensitiveData
    if (can('users.viewSensitiveData')) {
      cols.push(defs.id)
    }

    // Nombre: Siempre visible si puede ver usuarios
    if (can('users.view')) {
      cols.push(defs.fullName)
    }

    // Email: Solo con viewSensitiveData
    if (can('users.viewSensitiveData')) {
      cols.push(defs.email)
    }

    // Teléfono: Solo con viewSensitiveData
    if (can('users.viewSensitiveData')) {
      cols.push(defs.phone)
    }

    // Rol: Siempre visible
    if (can('users.view')) {
      cols.push(defs.role)
    }

    // Estado: Solo con edit permission (para poder cambiar estado)
    if (can('users.edit')) {
      cols.push(defs.isActive)
    }

    return cols
  })

  return {
    visibleColumns,
    allColumns,
  }
}
