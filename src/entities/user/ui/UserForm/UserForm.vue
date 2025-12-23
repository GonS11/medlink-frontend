<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {useUserForm} from '@entities/user/model/composables/useUserForm'
import {UserRoleArray} from '@shared/types/api.types'
import FormComponent from '@shared/ui/components/atoms/FormComponent/FormComponent.vue'
import FormFieldsetComponent from '@shared/ui/components/atoms/FormFieldsetComponent/FormFieldsetComponent.vue'
import FormRowComponent from '@shared/ui/components/atoms/FormRowComponent/FormRowComponent.vue'
import InputComponent from '@shared/ui/components/atoms/InputComponent/InputComponent.vue'
import SelectComponent from '@shared/ui/components/atoms/SelectComponent/SelectComponent.vue'
import CheckboxComponent from '@shared/ui/components/atoms/CheckBoxComponent/CheckboxComponent.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import type {UserFormProps} from '@entities/user/model/types/user.ui.types'

const props = defineProps<UserFormProps>()
const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const {t} = useI18n()

const {form, errors, handleSubmit, handleInput, handleBlur, handleCancel} = useUserForm({
  mode: props.mode,
  user: props.user,
  onSubmit: (data) => emit('submit', data),
  onCancel: () => emit('cancel'),
})

const roleOptions = UserRoleArray.map(role => ({
  value: role,
  label: t(`roles.${role}`)
}))

const languageOptions = [
  {value: 'es', label: 'Español'},
  {value: 'en', label: 'English'},
  {value: 'fr', label: 'Français'},
]
</script>

<template>
  <FormComponent
    :title="mode === 'create' ? $t('entities.user.create') : $t('entities.user.edit')"
    variant="elevated"
    max-width="lg"
    @submit="handleSubmit"
    class="user-form"
  >
    <!-- Información Personal -->
    <FormFieldsetComponent :legend="$t('entities.user.personalInfo')" variant="bordered">
      <FormRowComponent :columns="2">
        <InputComponent
          :model-value="form.firstName"
          :label="$t('fields.firstName')"
          :error="errors.firstName"
          required
          @update:model-value="handleInput('firstName', $event)"
          @blur="handleBlur('firstName')"
        />
        <InputComponent
          :model-value="form.lastName"
          :label="$t('fields.lastName')"
          :error="errors.lastName"
          required
          @update:model-value="handleInput('lastName', $event)"
          @blur="handleBlur('lastName')"
        />
      </FormRowComponent>
    </FormFieldsetComponent>

    <!-- Información de Contacto -->
    <FormFieldsetComponent :legend="$t('entities.user.contactInfo')" variant="bordered">
      <FormRowComponent :columns="1">
        <InputComponent
          :model-value="form.email"
          :label="$t('fields.email')"
          :error="errors.email"
          type="email"
          required
          @update:model-value="handleInput('email', $event)"
          @blur="handleBlur('email')"
        />
      </FormRowComponent>
      <FormRowComponent :columns="2">
        <InputComponent
          :model-value="form.phone"
          :label="$t('fields.phone')"
          :error="errors.phone"
          type="tel"
          @update:model-value="handleInput('phone', $event)"
          @blur="handleBlur('phone')"
        />
        <SelectComponent
          :model-value="form.preferredLanguage"
          :label="$t('fields.language')"
          :error="errors.preferredLanguage"
          :options="languageOptions"
          @update:model-value="handleInput('preferredLanguage', $event)"
        />
      </FormRowComponent>
    </FormFieldsetComponent>

    <!-- Rol y Permisos -->
    <FormFieldsetComponent :legend="$t('entities.user.rolePermissions')" variant="bordered">
      <FormRowComponent :columns="1">
        <SelectComponent
          :model-value="form.role"
          :label="$t('fields.role')"
          :error="errors.role"
          :options="roleOptions"
          required
          @update:model-value="handleInput('role', $event)"
        />
      </FormRowComponent>
      <FormRowComponent :columns="1">
        <CheckboxComponent
          :model-value="form.isActive"
          :label="$t('fields.isActive')"
          @update:model-value="handleInput('isActive', $event)"
        />
      </FormRowComponent>
    </FormFieldsetComponent>

    <template #footer>
      <div class="user-form__actions">
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

<style scoped lang="scss" src="./UserForm.scss"></style>
