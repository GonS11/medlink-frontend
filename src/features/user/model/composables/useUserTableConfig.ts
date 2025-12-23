import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {usePermissions} from '@shared/composables/usePermissions'
import type {TableColumn} from '@shared/types/table.types'

export function useUserTableConfig() {
  const {t} = useI18n()
  const {can} = usePermissions()

  const allColumns = computed<Record<string, TableColumn>>(() => ({
    id: {
      key: 'id',
      label: t('fields.id'),
      width: '70px',
      sortable: true,
      align: 'center'
    },
    fullName: {
      key: 'firstName',
      label: t('fields.name'),
      width: '150px',
      sortable: true,
    },
    email: {
      key: 'email',
      label: t('fields.email'),
      width: '150px',
      sortable: true,
    },
    role: {
      key: 'role',
      label: t('fields.role'),
      width: '120px',
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
      width: '20px',
      sortable: false,
    }
  }))

  const visibleColumns = computed<TableColumn[]>(() => {
    const cols: TableColumn[] = []
    const defs = allColumns.value

    if (can('users.viewSensitiveData')) {
      cols.push(defs.id)
    }

    if (can('users.view')) {
      cols.push(defs.fullName)
    }

    if (can('users.viewSensitiveData')) {
      cols.push(defs.email)
    }

    if (can('users.viewSensitiveData')) {
      cols.push(defs.phone)
    }

    if (can('users.view')) {
      cols.push(defs.role)
    }

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
