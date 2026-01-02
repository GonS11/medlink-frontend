import {storeToRefs} from 'pinia'
import * as healthCenterService from '../../api/healthCenter.service'
import {useEntityCrud} from '@shared/composables/useEntityCrud'
import {useI18n} from "vue-i18n"
import {useHealthCenterStore} from "@entities/healthCenter/model/store/healthCenter.store.ts"
import type {
  HealthCenterResponse,
  CreateHealthCenterRequest,
  UpdateHealthCenterRequest
} from "@entities/healthCenter/model/types/healthCenter.types.ts"

export function useHealthCenterCrud() {
  const store = useHealthCenterStore()
  const {t} = useI18n()
  const {healthCenters, pagination} = storeToRefs(store)

  const entityStore = {
    items: healthCenters,
    pagination: pagination,
    setItems: store.setHealthCenters,
    setPagination: store.setPagination,
    updateItem: store.updateHealthCenter,
    removeItem: store.removeHealthCenter,
  }

  const entityService = {
    getAll: healthCenterService.getAllHealthCenters,
    getById: healthCenterService.getHealthCenterById,
    create: healthCenterService.createHealthCenter,
    update: healthCenterService.updateHealthCenter,
    delete: healthCenterService.deleteHealthCenter,
  }

  return useEntityCrud<HealthCenterResponse, CreateHealthCenterRequest, UpdateHealthCenterRequest>(
    entityStore,
    entityService,
    t('entities.healthCenter.name'),
    {
      refetchAfterCreate: false,
      refetchAfterUpdate: false,
      refetchAfterDelete: false,
    }
  )
}
