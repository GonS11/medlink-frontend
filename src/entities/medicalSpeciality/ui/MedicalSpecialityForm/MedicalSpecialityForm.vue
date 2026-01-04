<script setup lang="ts">
import {ref, computed, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import type {
  MedicalSpecialityResponse,
  CreateMedicalSpecialityRequest,
  UpdateMedicalSpecialityRequest
} from '@entities/medicalSpeciality/model/types/medicalSpeciality.types'
import type {SpecialityCategory} from '@shared/types/enums.types'
import InputComponent from '@shared/ui/components/atoms/InputComponent/InputComponent.vue'
import SelectComponent from '@shared/ui/components/atoms/SelectComponent/SelectComponent.vue'
import CheckComponent from '@shared/ui/components/atoms/CheckComponent/CheckComponent.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'

interface MedicalSpecialityFormProps {
  medicalSpeciality?: MedicalSpecialityResponse
  mode: 'create' | 'edit'
  loading?: boolean
}

interface MedicalSpecialityFormEmits {
  (e: 'submit', data: CreateMedicalSpecialityRequest | UpdateMedicalSpecialityRequest): void

  (e: 'cancel'): void
}

const props = withDefaults(defineProps<MedicalSpecialityFormProps>(), {
  loading: false
})

const emit = defineEmits<MedicalSpecialityFormEmits>()
const {t} = useI18n()

const formData = ref<CreateMedicalSpecialityRequest>({
  name: '',
  category: 'MEDICAL' as SpecialityCategory,
  requiresMIR: false,
  yearsOfTraining: 0,
  isActive: true
})

const errors = ref<Partial<Record<keyof CreateMedicalSpecialityRequest, string>>>({})

const categoryOptions = computed(() => [
  {value: 'MEDICAL', label: t('medicalSpeciality.categories.MEDICAL')},
  {value: 'SURGICAL', label: t('medicalSpeciality.categories.SURGICAL')},
  {value: 'DIAGNOSTIC', label: t('medicalSpeciality.categories.DIAGNOSTIC')},
  {value: 'SUPPORT', label: t('medicalSpeciality.categories.SUPPORT')},
  {value: 'MENTAL_HEALTH', label: t('medicalSpeciality.categories.MENTAL_HEALTH')},
  {value: 'PEDIATRIC', label: t('medicalSpeciality.categories.PEDIATRIC')},
  {value: 'GERIATRIC', label: t('medicalSpeciality.categories.GERIATRIC')},
  {value: 'OTHER', label: t('medicalSpeciality.categories.OTHER')},
])

watch(() => props.medicalSpeciality, (speciality) => {
  if (speciality && props.mode === 'edit') {
    formData.value = {
      name: speciality.name,
      category: speciality.category,
      requiresMIR: speciality.requiresMIR,
      yearsOfTraining: speciality.yearsOfTraining,
      isActive: speciality.isActive
    }
  }
}, {immediate: true})

const validate = (): boolean => {
  errors.value = {}

  if (!formData.value.name?.trim()) {
    errors.value.name = t('validation.required', {field: t('fields.name')})
  }

  if (!formData.value.category) {
    errors.value.category = t('validation.required', {field: t('fields.category')})
  }

  if (formData.value.yearsOfTraining !== undefined && formData.value.yearsOfTraining < 0) {
    errors.value.yearsOfTraining = t('validation.min', {field: t('fields.yearsOfTraining'), min: 0})
  }

  if (formData.value.yearsOfTraining !== undefined && formData.value.yearsOfTraining > 10) {
    errors.value.yearsOfTraining = t('validation.max', {field: t('fields.yearsOfTraining'), max: 10})
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validate()) return

  emit('submit', formData.value)
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <form class="medical-speciality-form" @submit.prevent="handleSubmit">
    <div class="medical-speciality-form__content">
      <InputComponent
        v-model="formData.name"
        :label="$t('fields.name')"
        :placeholder="$t('placeholders.medicalSpecialityName')"
        :error="errors.name"
        required
        :disabled="loading"
      />

      <SelectComponent
        v-model="formData.category"
        :label="$t('fields.category')"
        :options="categoryOptions"
        :error="errors.category"
        required
        :disabled="loading"
      />

      <InputComponent
        v-model.number="formData.yearsOfTraining"
        type="number"
        :label="$t('fields.yearsOfTraining')"
        :placeholder="$t('placeholders.yearsOfTraining')"
        :error="errors.yearsOfTraining"
        :min="0"
        :max="10"
        :disabled="loading"
      />

      <div class="medical-speciality-form__checkboxes">
        <CheckComponent
          v-model="formData.requiresMIR"
          :label="$t('fields.requiresMIR')"
          :disabled="loading"
        />

        <CheckComponent
          v-model="formData.isActive"
          :label="$t('fields.isActive')"
          :disabled="loading"
        />
      </div>
    </div>

    <div class="medical-speciality-form__actions">
      <ButtonComponent
        type="button"
        variant="ghost"
        :disabled="loading"
        @click="handleCancel"
      >
        {{ $t('common.cancel') }}
      </ButtonComponent>

      <ButtonComponent
        type="submit"
        variant="primary"
        :loading="loading"
      >
        {{ mode === 'create' ? $t('common.create') : $t('common.save') }}
      </ButtonComponent>
    </div>
  </form>
</template>

<style scoped lang="scss" src="./MedicalSpecialityForm.scss"></style>
