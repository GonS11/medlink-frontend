<script setup lang="ts">
import type {MedicalSpecialityResponse} from '@entities/medicalSpeciality/model/types/medicalSpeciality.types'
import CardComponent from '@shared/ui/components/atoms/CardComponent/CardComponent.vue'
import BadgeComponent from '@shared/ui/components/atoms/BadgeComponent/BadgeComponent.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import EditIcon from '@shared/ui/icons/EditIcon.vue'
import DeleteIcon from '@shared/ui/icons/DeleteIcon.vue'
import CheckIcon from '@shared/ui/icons/CheckIcon.vue'
import XIcon from '@shared/ui/icons/XIcon.vue'
import {
  useMedicalSpecialityPermissions
} from '@features/medicalSpeciality/model/composables/useMedicalSpecialityPermissions'
import {
  getSpecialityCategoryKey,
  getSpecialityCategoryVariant,
  getSpecialityCategoryIcon // Importamos el getter del icono
} from "@features/medicalSpeciality/model/composables/useMedicalSpecialityConfig.ts"
import {MedicalSpecialityCardProps} from "@features/medicalSpeciality/model/types/medicalSpeciality.ui.types.ts"

defineProps<MedicalSpecialityCardProps>()

const emit = defineEmits<{
  edit: [medicalSpeciality: MedicalSpecialityResponse]
  delete: [medicalSpeciality: MedicalSpecialityResponse]
}>()

const permissions = useMedicalSpecialityPermissions()

const canEdit = (speciality: MedicalSpecialityResponse) =>
  permissions.canEditMedicalSpeciality(speciality.id)

const canDelete = (speciality: MedicalSpecialityResponse) =>
  permissions.canDeleteMedicalSpeciality(speciality.id)
</script>

<template>
  <CardComponent
    variant="shadow"
    padding="none"
    hoverable
    class="medical-speciality-card"
    :class="{'medical-speciality-card--inactive': !medicalSpeciality.isActive}"
  >
    <template #header>
      <div class="medical-speciality-card__header">
        <span class="medical-speciality-card__code">{{ medicalSpeciality.code }}</span>
        <BadgeComponent
          :variant="medicalSpeciality.isActive ? 'success' : 'secondary'"
          size="sm"
        >
          {{ medicalSpeciality.isActive ? $t('common.active') : $t('common.inactive') }}
        </BadgeComponent>
      </div>
    </template>

    <div class="medical-speciality-card__body">
      <h3 class="medical-speciality-card__title">
        {{ medicalSpeciality.name }}
      </h3>

      <div class="medical-speciality-card__category">
        <BadgeComponent
          :variant="getSpecialityCategoryVariant(medicalSpeciality.category)"
          :icon="getSpecialityCategoryIcon(medicalSpeciality.category)"
          size="md"
        >
          {{ $t(getSpecialityCategoryKey(medicalSpeciality.category)) }}
        </BadgeComponent>
      </div>

      <div class="medical-speciality-card__info">
        <div class="medical-speciality-card__info-item">
          <span class="medical-speciality-card__info-label">
            {{ $t('fields.requiresMIR') }}:
          </span>
          <span class="medical-speciality-card__info-value">
            <CheckIcon
              v-if="medicalSpeciality.requiresMIR"
              :label="$t('icons.check')"
              class="medical-speciality-card__icon medical-speciality-card__icon--success"
            />
            <XIcon
              v-else
              :label="$t('icons.X')"
              class="medical-speciality-card__icon medical-speciality-card__icon--error"
            />
          </span>
        </div>

        <div class="medical-speciality-card__info-item">
          <span class="medical-speciality-card__info-label">
            {{ $t('fields.yearsOfTraining') }}:
          </span>
          <span class="medical-speciality-card__info-value medical-speciality-card__info-value--highlight">
            {{ medicalSpeciality.yearsOfTraining }} {{ $t('common.years') }}
          </span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="medical-speciality-card__actions">
        <ButtonComponent
          v-if="canEdit(medicalSpeciality)"
          variant="ghost"
          size="sm"
          :icon="EditIcon"
          :title="$t('common.edit')"
          @click="emit('edit', medicalSpeciality)"
        >
          {{ $t('common.edit') }}
        </ButtonComponent>

        <ButtonComponent
          v-if="canDelete(medicalSpeciality)"
          variant="ghost"
          size="sm"
          class="medical-speciality-card__action-btn--danger"
          :icon="DeleteIcon"
          :title="$t('common.delete')"
          @click="emit('delete', medicalSpeciality)"
        >
          {{ $t('common.delete') }}
        </ButtonComponent>
      </div>
    </template>
  </CardComponent>
</template>

<style scoped lang="scss" src="./MedicalSpecialityCard.scss"></style>
