<script setup lang="ts">
import {onMounted} from 'vue'
import ListPageLayout from '@shared/ui/components/layout/PageLayout/ListPageLayout.vue'
import MedicalSpecialitiesCarousel
  from '@features/medicalSpeciality/ui/MedicalSpecialitiesCarousel/MedicalSpecialitiesCarousel.vue'
import ModalComponent from '@shared/ui/components/molecules/ModalComponent/ModalComponent.vue'
import type {MedicalSpecialityCardAction} from '@features/medicalSpeciality/model/types/medicalSpeciality.feature.types'
import {
  useMedicalSpecialityManagement
} from "@features/medicalSpeciality/model/composables/useMedicalSpecialityManagement.ts";
import MedicalSpecialityForm from "@entities/medicalSpeciality/ui/MedicalSpecialityForm/MedicalSpecialityForm.vue";

const management = useMedicalSpecialityManagement()

onMounted(() => {
  management.initialize()
})

const handleCardAction = (action: MedicalSpecialityCardAction) => {
  const handlers = {
    edit: management.handleEdit,
    delete: management.handleDelete,
  }
  handlers[action.type]?.(action.medicalSpeciality)
}
</script>

<template>
  <ListPageLayout
    class="medical-specialities-page"
    :title="$t('nav.items.medicalSpecialities')"
    :subtitle="management.permissions.canCreate.value
      ? $t('entities.medicalSpeciality.manage')
      : $t('entities.medicalSpeciality.view')"
    :show-create="management.permissions.canCreate.value"
    @create="management.handleCreate"
  >
    <MedicalSpecialitiesCarousel
      :medical-specialities="management.medicalSpecialities.value"
      :loading="management.loading.value"
      :pagination="management.pagination.value"
      @action="handleCardAction"
      @load-more="management.handleLoadMore"
    />

    <ModalComponent
      :show="management.createModal.show.value"
      :title="$t('entities.medicalSpeciality.create')"
      size="lg"
      :show-footer="false"
      @update:show="management.createModal.show.value = $event"
    >
      <MedicalSpecialityForm
        mode="create"
        :loading="management.loading.value"
        @submit="management.handleSubmitCreate"
        @cancel="management.createModal.close"
      />
    </ModalComponent>

    <ModalComponent
      :show="management.editModal.show.value"
      :title="$t('entities.medicalSpeciality.edit')"
      size="lg"
      :show-footer="false"
      @update:show="management.editModal.show.value = $event"
    >
      <MedicalSpecialityForm
        v-if="management.editModal.data.value"
        :medical-speciality="management.editModal.data.value"
        mode="edit"
        :loading="management.loading.value"
        @submit="management.handleSubmitEdit"
        @cancel="management.editModal.close"
      />
    </ModalComponent>
  </ListPageLayout>
</template>
