<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useHealthCenterForm} from '@entities/healthCenter/model/composables/useHealthCenterForm'
import FormComponent from '@shared/ui/components/atoms/FormComponent/FormComponent.vue'
import FormSection from '@shared/ui/components/atoms/FormSection/FormSection.vue'
import FormLayout from '@shared/ui/components/atoms/FormLayout/FormLayout.vue'
import InputComponent from '@shared/ui/components/atoms/InputComponent/InputComponent.vue'
import SelectComponent from '@shared/ui/components/atoms/SelectComponent/SelectComponent.vue'
import CheckboxComponent from '@shared/ui/components/atoms/CheckBoxComponent/CheckboxComponent.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import TextAreaComponent from '@shared/ui/components/atoms/TextAreaComponent/TextAreaComponent.vue'
import {AutonomousCommunityArray, HealthCenterLevel, HealthCenterType} from "@shared/types/enums.types.ts";
import {HealthCenterFormProps} from "@entities/healthCenter/model/types/health.ui.types.ts";

const props = defineProps<HealthCenterFormProps>()
const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const {t} = useI18n()

const {form, errors, handleSubmit, handleInput, handleBlur, handleCancel, mode} = useHealthCenterForm({
  mode: props.mode,
  healthCenter: props.healthCenter,
  onSubmit: (data) => emit('submit', data),
  onCancel: () => emit('cancel'),
})

const typeOptions = Object.values(HealthCenterType).map(type => ({
  value: type,
  label: t(`healthCenter.types.${type}`)
}))

const levelOptions = Object.values(HealthCenterLevel).map(level => ({
  value: level,
  label: t(`healthCenter.levels.${level}`)
}))

const autonomousCommunityOptions = AutonomousCommunityArray.map(ac => ({
  value: ac,
  label: t(`autonomousCommunities.${ac}`)
}))

// Lógica mejorada para mostrar camas: solo si es hospital, especializado o si tiene camas asignadas previamente
const showBedsFields = computed(() =>
  form.type === HealthCenterType.HOSPITAL ||
  form.type === HealthCenterType.SPECIALIZED_CENTER ||
  form.totalBeds > 0
)

const showEmergencyFields = computed(() => form.hasEmergency)
const showICUFields = computed(() => form.hasICU)
</script>

<template>
  <FormComponent
    :title="mode === 'create' ? $t('entities.healthCenter.create') : $t('entities.healthCenter.edit')"
    variant="borderless"
    max-width="xl"
    :loading="props.loading"
    @submit="handleSubmit"
    class="health-center-form"
  >
    <FormSection :title="$t('entities.healthCenter.basicInfo')" variant="bordered">
      <FormLayout>
        <InputComponent
          :model-value="form.name"
          :label="$t('fields.name')"
          :error="errors.name"
          required
          @update:model-value="handleInput('name', $event)"
          @blur="handleBlur('name')"
        />
      </FormLayout>

      <FormLayout :columns="2">
        <SelectComponent
          :model-value="form.type"
          :label="$t('fields.type')"
          :error="errors.type"
          :options="typeOptions"
          required
          :disabled="mode === 'edit'"
          @update:model-value="handleInput('type', $event as HealthCenterType)"
        />
        <SelectComponent
          :model-value="form.level"
          :label="$t('fields.level')"
          :error="errors.level"
          :options="levelOptions"
          required
          :disabled="mode === 'edit'"
          @update:model-value="handleInput('level', $event as HealthCenterLevel)"
        />
      </FormLayout>
    </FormSection>

    <FormSection :title="$t('entities.healthCenter.locationInfo')" variant="bordered">
      <FormLayout>
        <SelectComponent
          :model-value="form.autonomousCommunity"
          :label="$t('fields.autonomousCommunity')"
          :error="errors.autonomousCommunity"
          :options="autonomousCommunityOptions"
          required
          @update:model-value="handleInput('autonomousCommunity', $event)"
        />
      </FormLayout>

      <FormLayout>
        <InputComponent
          :model-value="form.address"
          :label="$t('fields.address')"
          :error="errors.address"
          required
          @update:model-value="handleInput('address', $event)"
          @blur="handleBlur('address')"
        />
      </FormLayout>

      <FormLayout :columns="3">
        <InputComponent
          :model-value="form.city"
          :label="$t('fields.city')"
          :error="errors.city"
          required
          @update:model-value="handleInput('city', $event)"
          @blur="handleBlur('city')"
        />

        <InputComponent
          :model-value="form.province"
          :label="$t('fields.province')"
          :error="errors.province"
          required
          @update:model-value="handleInput('province', $event)"
          @blur="handleBlur('province')"
        />

        <InputComponent
          :model-value="form.postalCode"
          :label="$t('fields.postalCode')"
          :error="errors.postalCode"
          required
          maxlength="5"
          @update:model-value="handleInput('postalCode', $event)"
          @blur="handleBlur('postalCode')"
        />
      </FormLayout>
    </FormSection>

    <FormSection :title="$t('entities.healthCenter.contactInfo')" variant="bordered">
      <FormLayout :columns="2">
        <InputComponent
          :model-value="form.phone"
          :label="$t('fields.phone')"
          :error="errors.phone"
          type="tel"
          required
          @update:model-value="handleInput('phone', $event)"
          @blur="handleBlur('phone')"
        />

        <InputComponent
          :model-value="form.emergencyPhone"
          :label="$t('fields.emergencyPhone')"
          :error="errors.emergencyPhone"
          type="tel"
          @update:model-value="handleInput('emergencyPhone', $event)"
          @blur="handleBlur('emergencyPhone')"
        />
      </FormLayout>

      <FormLayout :columns="2">
        <InputComponent
          :model-value="form.email"
          :label="$t('fields.email')"
          :error="errors.email"
          type="email"
          @update:model-value="handleInput('email', $event)"
          @blur="handleBlur('email')"
        />

        <InputComponent
          :model-value="form.website"
          :label="$t('fields.website')"
          :error="errors.website"
          type="url"
          placeholder="https://..."
          @update:model-value="handleInput('website', $event)"
          @blur="handleBlur('website')"
        />
      </FormLayout>
    </FormSection>

    <FormSection
      v-if="showBedsFields"
      :title="$t('entities.healthCenter.capacityInfo')"
      variant="bordered"
    >
      <FormLayout :columns="3">
        <InputComponent
          :model-value="form.totalBeds"
          :label="$t('fields.totalBeds')"
          :error="errors.totalBeds"
          type="number"
          @update:model-value="handleInput('totalBeds', Number($event))"
          @blur="handleBlur('totalBeds')"
        />

        <InputComponent
          v-if="showICUFields"
          :model-value="form.icuBeds"
          :label="$t('fields.icuBeds')"
          :error="errors.icuBeds"
          type="number"
          @update:model-value="handleInput('icuBeds', Number($event))"
          @blur="handleBlur('icuBeds')"
        />

        <InputComponent
          v-if="showEmergencyFields"
          :model-value="form.emergencyBeds"
          :label="$t('fields.emergencyBeds')"
          :error="errors.emergencyBeds"
          type="number"
          @update:model-value="handleInput('emergencyBeds', Number($event))"
          @blur="handleBlur('emergencyBeds')"
        />
      </FormLayout>
    </FormSection>

    <FormSection :title="$t('entities.healthCenter.services')" variant="bordered">
      <FormLayout :columns="2">
        <CheckboxComponent
          :model-value="form.hasEmergency"
          :label="$t('fields.hasEmergency')"
          @update:model-value="handleInput('hasEmergency', $event)"
        />

        <CheckboxComponent
          :model-value="form.hasICU"
          :label="$t('fields.hasICU')"
          @update:model-value="handleInput('hasICU', $event)"
        />

        <CheckboxComponent
          :model-value="form.hasHeliport"
          :label="$t('fields.hasHeliport')"
          @update:model-value="handleInput('hasHeliport', $event)"
        />

        <CheckboxComponent
          :model-value="form.isTeachingHospital"
          :label="$t('fields.isTeachingHospital')"
          @update:model-value="handleInput('isTeachingHospital', $event)"
        />
      </FormLayout>
    </FormSection>

    <FormSection :title="$t('entities.healthCenter.characteristics')" variant="bordered">
      <FormLayout>
        <CheckboxComponent
          :model-value="form.isPublic"
          :label="$t('fields.isPublic')"
          @update:model-value="handleInput('isPublic', $event)"
        />
      </FormLayout>

      <FormLayout>
        <TextAreaComponent
          :model-value="form.accreditations"
          :label="$t('fields.accreditations')"
          :error="errors.accreditations"
          :rows="4"
          :maxlength="1000"
          @update:model-value="handleInput('accreditations', $event)"
          @blur="handleBlur('accreditations')"
        />
      </FormLayout>
    </FormSection>

    <template #footer>
      <div class="health-center-form__actions">
        <ButtonComponent
          type="button"
          variant="ghost"
          :disabled="props.loading"
          @click="handleCancel"
        >
          {{ $t('common.cancel') }}
        </ButtonComponent>
        <ButtonComponent
          type="submit"
          variant="primary"
          :loading="props.loading"
        >
          {{ mode === 'create' ? $t('common.create') : $t('common.save') }}
        </ButtonComponent>
      </div>
    </template>
  </FormComponent>
</template>

<style scoped lang="scss" src="./HealthCenterForm.scss"></style>
