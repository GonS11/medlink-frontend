<script setup lang="ts">
import type {MedicalSpecialityResponse} from '@entities/medicalSpeciality/model/types/medicalSpeciality.types'
import type {
  MedicalSpecialitiesCarouselProps,
  MedicalSpecialitiesCarouselEmits,
  MedicalSpecialityCardAction
} from '@features/medicalSpeciality/model/types/medicalSpeciality.feature.types'
import CarouselComponent from '@shared/ui/components/organisms/CarouselComponent/CarouselComponent.vue'
import MedicalSpecialityCard from '@features/medicalSpeciality/ui/MedicalSpecialityCard/MedicalSpecialityCard.vue'

withDefaults(defineProps<MedicalSpecialitiesCarouselProps>(), {
  loading: false,
  pagination: null,
})

const emit = defineEmits<MedicalSpecialitiesCarouselEmits>()

const handleAction = (type: 'edit' | 'delete', medicalSpeciality: MedicalSpecialityResponse) => {
  const action: MedicalSpecialityCardAction = {
    type,
    medicalSpeciality
  }
  emit('action', action)
}

const handleLoadMore = () => {
  emit('load-more')
}
</script>

<template>
  <CarouselComponent
    :items="medicalSpecialities"
    :loading="loading"
    :pagination="pagination"
    :empty-message="$t('entities.medicalSpeciality.noMedicalSpecialities')"
    item-width="320px"
    class="medical-specialities-carousel"
    @load-more="handleLoadMore"
  >
    <template #item="{ item }">
      <MedicalSpecialityCard
        :medical-speciality="item"
        @edit="handleAction('edit', item)"
        @delete="handleAction('delete', item)"
      />
    </template>
  </CarouselComponent>
</template>
