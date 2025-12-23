<script setup lang="ts">
import {useAuth} from "@features/auth/model/composables/useAuth"
import {useRegisterForm} from "@features/auth/model/composables/useRegisterForm"
import FormComponent from "@shared/ui/components/atoms/FormComponent/FormComponent.vue"
import FormFieldsetComponent from "@shared/ui/components/atoms/FormFieldsetComponent/FormFieldsetComponent.vue"
import FormRowComponent from "@shared/ui/components/atoms/FormRowComponent/FormRowComponent.vue"
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue"
import SelectComponent from "@shared/ui/components/atoms/SelectComponent/SelectComponent.vue"
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue"
import SubmitIcon from "@shared/ui/icons/SubmitIcon.vue"

const {register, loading} = useAuth()

const {form, errors, roleOptions, languageOptions, handleSubmit, handleInput, validateField} = useRegisterForm({
  onSubmit: async (data) => {
    await register(data)
  }
})
</script>

<template>
  <FormComponent
    class="register-form"
    :title="$t('auth.registerTitle')"
    :subtitle="$t('auth.registerSubtitle')"
    max-width="lg"
    @submit="handleSubmit"
  >
    <FormFieldsetComponent :legend="$t('entities.user.personalInfo')" variant="bordered">
      <FormRowComponent :columns="2">
        <InputComponent
          :model-value="form.firstName"
          :label="$t('fields.firstName')"
          :error="errors.firstName"
          required
          @update:model-value="handleInput('firstName', $event)"
          @blur="validateField('firstName')"
        />
        <InputComponent
          :model-value="form.lastName"
          :label="$t('fields.lastName')"
          :error="errors.lastName"
          required
          @update:model-value="handleInput('lastName', $event)"
          @blur="validateField('lastName')"
        />
      </FormRowComponent>
      <InputComponent
        :model-value="form.secondLastName"
        :label="$t('fields.secondLastName')"
        :error="errors.secondLastName"
        @update:model-value="handleInput('secondLastName', $event)"
      />
    </FormFieldsetComponent>

    <FormFieldsetComponent :legend="$t('entities.user.contactInfo')" variant="bordered">
      <InputComponent
        :model-value="form.email"
        type="email"
        :label="$t('fields.email')"
        :error="errors.email"
        required
        @update:model-value="handleInput('email', $event)"
        @blur="validateField('email')"
      />
      <FormRowComponent :columns="2">
        <InputComponent
          :model-value="form.phone"
          type="tel"
          :label="$t('fields.phone')"
          :error="errors.phone"
          @update:model-value="handleInput('phone', $event)"
          @blur="validateField('phone')"
        />
        <InputComponent
          :model-value="form.mobilePhone"
          type="tel"
          :label="$t('fields.mobile')"
          :error="errors.mobilePhone"
          @update:model-value="handleInput('mobilePhone', $event)"
          @blur="validateField('mobilePhone')"
        />
      </FormRowComponent>
    </FormFieldsetComponent>

    <FormFieldsetComponent :legend="$t('entities.user.settings')" variant="bordered">
      <FormRowComponent :columns="2">
        <SelectComponent
          :model-value="form.role"
          :options="roleOptions"
          :label="$t('fields.role')"
          :error="errors.role"
          required
          @update:model-value="handleInput('role', $event)"
          @blur="validateField('role')"
        />
        <SelectComponent
          :model-value="form.preferredLanguage"
          :options="languageOptions"
          :label="$t('fields.preferredLanguage')"
          :error="errors.preferredLanguage"
          @update:model-value="handleInput('preferredLanguage', $event)"
        />
      </FormRowComponent>
    </FormFieldsetComponent>

    <FormFieldsetComponent :legend="$t('auth.security')" variant="bordered">
      <FormRowComponent :columns="2">
        <InputComponent
          :model-value="form.password"
          type="password"
          :label="$t('fields.password')"
          :error="errors.password"
          required
          show-password-toggle
          @update:model-value="handleInput('password', $event)"
          @blur="validateField('password')"
        />
        <InputComponent
          :model-value="form.confirmPassword"
          type="password"
          :label="$t('auth.confirmPassword')"
          :error="errors.confirmPassword"
          required
          show-password-toggle
          @update:model-value="handleInput('confirmPassword', $event)"
          @blur="validateField('confirmPassword')"
        />
      </FormRowComponent>
    </FormFieldsetComponent>

    <template #footer>
      <div class="form__actions">
        <ButtonComponent
          type="submit"
          variant="primary"
          size="lg"
          full-width
          :loading="loading"
          :disabled="loading"
        >
          <template #icon>
            <SubmitIcon :label="$t('icons.submit')" />
          </template>
          {{ $t('auth.register') }}
        </ButtonComponent>
      </div>

      <p class="register-form__redirect">
        {{ $t('auth.hasAccount') }}
        <router-link to="/login">
          {{ $t('auth.login') }}
        </router-link>
      </p>
    </template>
  </FormComponent>
</template>
