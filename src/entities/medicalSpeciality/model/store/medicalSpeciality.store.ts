import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {MedicalSpecialityResponse} from "@entities/medicalSpeciality/model/types/medicalSpeciality.types.ts";
import {PageResponse, PaginationParams} from "@shared/types/api.types.ts";
import * as medicalSpecialitiesService from '@entities/medicalSpeciality/api/medicalSpeciality.service.ts';

export const useMedicalSpecialityStore = defineStore('medicalSpeciality', () => {
  const medicalSpecialities = ref<MedicalSpecialityResponse[]>([]);
  const pagination = ref<PageResponse<MedicalSpecialityResponse> | null>(null)
  const totalMedicalSpecialities = computed(() => pagination.value?.totalElements ?? 0);

  async function getAllMedicalSpecialities(params?: PaginationParams) {
    const response = await medicalSpecialitiesService.getAllMedicalSpecialities(params);
    medicalSpecialities.value = response.content;
    pagination.value = response;
  }

  function setMedicalSpecialities(data: MedicalSpecialityResponse[]) {
    medicalSpecialities.value = data;
  }

  function setPagination(data: PageResponse<MedicalSpecialityResponse> | null) {
    pagination.value = data;
  }

  function updateMedicalSpeciality(updateMedicalSpeciality: MedicalSpecialityResponse) {
    const index = medicalSpecialities.value.findIndex((medicalSpeciality) => medicalSpeciality.id === updateMedicalSpeciality.id);
    if (index !== -1) {
      medicalSpecialities.value[index] = updateMedicalSpeciality;
    }
  }

  function removeMedicalSpeciality(medicalSpecialityId: number) {
    medicalSpecialities.value = medicalSpecialities.value.filter((medicalSpeciality) => medicalSpeciality.id === medicalSpecialityId);
  }

  return {
    medicalSpecialities,
    pagination,
    totalMedicalSpecialities,
    getAllMedicalSpecialities,
    setMedicalSpecialities,
    setPagination,
    updateMedicalSpeciality,
    removeMedicalSpeciality,
  }
})
