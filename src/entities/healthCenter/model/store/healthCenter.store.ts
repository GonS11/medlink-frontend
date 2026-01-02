import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import type {HealthCenterResponse} from '../types/healthCenter.types';
import type {PageResponse, PaginationParams} from '@shared/types/api.types';
import * as healthCenterService from '@entities/healthCenter/api/healthCenter.service';

export const useHealthCenterStore = defineStore('healthCenter', () => {
  const healthCenters = ref<HealthCenterResponse[]>([]);
  const pagination = ref<PageResponse<HealthCenterResponse> | null>(null);

  // Computed seguro que devuelve 0 si no hay paginación
  const totalHealthCenters = computed(() => pagination.value?.totalElements ?? 0);

  async function getAllHealthCenters(params?: PaginationParams) {
    const response = await healthCenterService.getAllHealthCenters(params);
    healthCenters.value = response.content;
    pagination.value = response;
  }

  function setHealthCenters(data: HealthCenterResponse[]) {
    healthCenters.value = data;
  }

  function setPagination(data: PageResponse<HealthCenterResponse> | null) {
    pagination.value = data;
  }

  function updateHealthCenter(updatedHealthCenter: HealthCenterResponse) {
    const index = healthCenters.value.findIndex(item => item.id === updatedHealthCenter.id);
    if (index !== -1) {
      healthCenters.value[index] = updatedHealthCenter;
    }
  }

  function removeHealthCenter(healthCenterId: number) {
    healthCenters.value = healthCenters.value.filter(item => item.id !== healthCenterId);
  }

  return {
    healthCenters,
    pagination,
    totalHealthCenters,
    getAllHealthCenters,
    setHealthCenters,
    setPagination,
    updateHealthCenter,
    removeHealthCenter
  };
});
