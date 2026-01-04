import {useMedicalSpecialityStore} from "@entities/medicalSpeciality/model/store/medicalSpeciality.store.ts";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import * as medicalSpecialitiesService from '@entities/medicalSpeciality/api/medicalSpeciality.service.ts';
import {useEntityCrud} from "@shared/composables/useEntityCrud.ts";
import {
  CreateMedicalSpecialityRequest,
  MedicalSpecialityResponse, UpdateMedicalSpecialityRequest
} from "@entities/medicalSpeciality/model/types/medicalSpeciality.types.ts";

export function useMedicalSpecialityCrud() {
  const store = useMedicalSpecialityStore()
  const {t} = useI18n()
  const {medicalSpecialities, pagination} = storeToRefs(store)

  const entityStore = {
    items: medicalSpecialities,
    pagination: pagination,
    setItems: store.setMedicalSpecialities,
    setPagination: store.setPagination,
    updateItem: store.updateMedicalSpeciality,
    removeItem: store.removeMedicalSpeciality,
  }

  const entityService = {
    getAll: medicalSpecialitiesService.getAllMedicalSpecialities,
    getById: medicalSpecialitiesService.getMedicalSpecialityById,
    create: medicalSpecialitiesService.createMedicalSpeciality,
    update: medicalSpecialitiesService.updateMedicalSpeciality,
    delete: medicalSpecialitiesService.deleteMedicalSpeciality,
  }

  return useEntityCrud<MedicalSpecialityResponse, CreateMedicalSpecialityRequest, UpdateMedicalSpecialityRequest>(
    entityStore,
    entityService,
    t('entities.medicalSpeciality.name'),
    {
      refetchAfterCreate: false,
      refetchAfterUpdate: false,
      refetchAfterDelete: false,
    }
  )
}
