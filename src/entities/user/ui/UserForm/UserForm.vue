<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {useUserForm} from '@entities/user/model/composables/useUserForm'
import type {UserFormProps} from '@entities/user/model/types/user.ui.types'
import FormComponent from '@shared/ui/components/atoms/FormComponent/FormComponent.vue'
import FormSection from '@shared/ui/components/atoms/FormSection/FormSection.vue'
import FormLayout from '@shared/ui/components/atoms/FormLayout/FormLayout.vue'
import InputComponent from '@shared/ui/components/atoms/InputComponent/InputComponent.vue'
import SelectComponent from '@shared/ui/components/atoms/SelectComponent/SelectComponent.vue'
import CheckboxComponent from '@shared/ui/components/atoms/CheckBoxComponent/CheckboxComponent.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import {LanguageCode, UserRoleArray} from "@shared/types/enums.types.ts"

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
  {value: LanguageCode.ES, label: 'Español'},
  {value: LanguageCode.EN, label: 'English'},
  {value: LanguageCode.CA, label: 'Català'},
  {value: LanguageCode.EU, label: 'Euskara'},
  {value: LanguageCode.GL, label: 'Galego'},
]
</script>

<template>
  <FormComponent
    :title="mode === 'create' ? $t('entities.user.create') : $t('entities.user.edit')"
    variant="borderless"
    max-width="lg"
    :loading="props.loading"
    @submit="handleSubmit"
    class="user-form"
  >
    <FormSection :title="$t('entities.user.personalInfo')" variant="bordered">
      <FormLayout :columns="2">
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
      </FormLayout>

      <FormLayout>
        <InputComponent
          :model-value="form.secondLastName"
          :label="$t('fields.secondLastName')"
          :error="errors.secondLastName"
          @update:model-value="handleInput('secondLastName', $event)"
          @blur="handleBlur('secondLastName')"
        />
      </FormLayout>
    </FormSection>

    <FormSection :title="$t('entities.user.contactInfo')" variant="bordered">
      <FormLayout>
        <InputComponent
          :model-value="form.email"
          :label="$t('fields.email')"
          :error="errors.email"
          type="email"
          required
          :disabled="mode === 'edit'"
          @update:model-value="handleInput('email', $event)"
          @blur="handleBlur('email')"
        />
      </FormLayout>

      <FormLayout :columns="2">
        <InputComponent
          :model-value="form.phone"
          :label="$t('fields.phone')"
          :error="errors.phone"
          type="tel"
          @update:model-value="handleInput('phone', $event)"
          @blur="handleBlur('phone')"
        />
        <InputComponent
          :model-value="form.mobilePhone"
          :label="$t('fields.mobilePhone')"
          :error="errors.mobilePhone"
          type="tel"
          @update:model-value="handleInput('mobilePhone', $event)"
          @blur="handleBlur('mobilePhone')"
        />
      </FormLayout>

      <FormLayout>
        <SelectComponent
          :model-value="form.preferredLanguage"
          :label="$t('fields.language')"
          :error="errors.preferredLanguage"
          :options="languageOptions"
          @update:model-value="handleInput('preferredLanguage', $event)"
        />
      </FormLayout>
    </FormSection>

    <!-- ✅ CRÍTICO: Sección de seguridad solo en modo CREATE -->
    <FormSection
      v-if="mode === 'create'"
      :title="$t('entities.user.security')"
      variant="bordered"
    >
      <FormLayout>
        <InputComponent
          :model-value="form.password"
          :label="$t('fields.password')"
          :error="errors.password"
          type="password"
          required
          autocomplete="new-password"
          @update:model-value="handleInput('password', $event)"
          @blur="handleBlur('password')"
        />
      </FormLayout>
    </FormSection>

    <FormSection :title="$t('entities.user.rolePermissions')" variant="bordered">
      <FormLayout gap="lg">
        <SelectComponent
          :model-value="form.role"
          :label="$t('fields.role')"
          :error="errors.role"
          :options="roleOptions"
          :disabled="mode === 'edit'"
          required
          @update:model-value="handleInput('role', $event)"
        />

        <CheckboxComponent
          :model-value="form.isActive"
          :label="$t('fields.isActive')"
          @update:model-value="handleInput('isActive', $event)"
        />
      </FormLayout>
    </FormSection>

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
