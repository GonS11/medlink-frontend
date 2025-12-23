import {computed} from 'vue'
import {useAsyncAction} from '@shared/composables/useAsyncAction'
import type {PaginationParams} from '@shared/types/api.types'
import {EntityService, EntityStore} from "@shared/types/composables.types.ts";
import {useI18n} from "vue-i18n";

export interface UseEntityCrudOptions {
  refetchAfterCreate?: boolean // ✅ Nuevo: controlar refetch
  refetchAfterUpdate?: boolean
  refetchAfterDelete?: boolean
}

export function useEntityCrud<T, CreateDto, UpdateDto, R = T>(
  store: EntityStore<T>,
  service: EntityService<T, CreateDto, UpdateDto, R>,
  entityName: string,
  options: UseEntityCrudOptions = {} // ✅ Opciones configurables
) {
  const {loading, error, execute} = useAsyncAction()
  const {t} = useI18n()

  const {
    refetchAfterCreate = true,
    refetchAfterUpdate = false, // ✅ Por defecto NO refetch (se actualiza con updateItem)
    refetchAfterDelete = false, // ✅ Por defecto NO refetch (se elimina con removeItem)
  } = options

  const currentPageSize = computed(() => store.pagination.value?.size ?? 20)

  const fetchAll = async (params?: PaginationParams) => {
    return execute(
      async () => {
        const response = await service.getAll(params)
        store.setItems(response.content)
        store.setPagination(response)
        return response
      },
      {
        errorMessage: t('common.entity.failFetch', {entity: entityName}),
        showSuccessNotification: false,
      }
    )
  }

  const fetchById = async (id: number) => {
    return execute(
      () => service.getById(id),
      {
        errorMessage: t('common.entity.failFetch', {entity: entityName}),
        showSuccessNotification: false,
      }
    )
  }

  const create = async (data: CreateDto): Promise<R | null> => {
    return execute(
      async () => {
        const created = await service.create(data)

        // ✅ Solo refetch si está configurado
        if (refetchAfterCreate) {
          await fetchAll({page: 0, size: currentPageSize.value})
        }

        return created
      },
      {
        successMessage: t('common.entity.create', {entity: entityName}),
        errorMessage: t('common.entity.failCreate', {entity: entityName}),
      }
    )
  }

  const update = async (id: number, data: UpdateDto) => {
    return execute(
      async () => {
        const updated = await service.update(id, data)

        // ✅ Actualizar en store local
        if (store.updateItem) {
          store.updateItem(updated)
        }

        // ✅ Refetch solo si está configurado
        if (refetchAfterUpdate) {
          await fetchAll({
            page: store.pagination.value?.number ?? 0,
            size: currentPageSize.value
          })
        }

        return updated
      },
      {
        successMessage: t('common.entity.update', {entity: entityName}),
        errorMessage: t('common.entity.failUpdate', {entity: entityName}),
      }
    )
  }

  const remove = async (id: number): Promise<boolean> => {
    const result = await execute(
      async () => {
        await service.delete(id)

        // ✅ Eliminar del store local
        if (store.removeItem) {
          store.removeItem(id)
        }

        // ✅ Refetch solo si está configurado
        if (refetchAfterDelete) {
          await fetchAll({
            page: store.pagination.value?.number ?? 0,
            size: currentPageSize.value
          })
        }

        return true
      },
      {
        successMessage: t('common.entity.delete', {entity: entityName}),
        errorMessage: t('common.entity.failDelete', {entity: entityName}),
      }
    )

    return result ?? false
  }

  return {
    items: store.items,
    pagination: store.pagination,
    loading,
    error,
    currentPageSize,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  }
}
