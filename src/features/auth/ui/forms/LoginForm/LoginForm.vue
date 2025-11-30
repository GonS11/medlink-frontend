<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {createAuthSchemas, type LoginFormData} from '@entities/auth/model/validation/auth.validation.ts'
import {useAuth} from '../../../model/composables/useAuth.ts'
import {useForm} from '@shared/composables/useForm.ts'
import CheckboxComponent from "@shared/ui/components/atoms/CheckBoxComponent/CheckboxComponent.vue"
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue"
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue"
import EmailIcon from "@shared/ui/icons/EmailIcon.vue"
import SubmitIcon from "@shared/ui/icons/SubmitIcon.vue"
import FormComponent from "@shared/ui/components/atoms/FormComponent/FormComponent.vue"
import {useRememberMe} from "@features/auth/model/composables/useRememberMe.ts";
import FormFieldComponent from "@shared/ui/components/atoms/FormFieldComponent/FormFieldComponent.vue";

const {t} = useI18n()
const {loginSchema} = createAuthSchemas(t)
const {login, loading} = useAuth()
const {rememberMe, loadSavedEmail, saveEmail} = useRememberMe()

const {form, errors, validateField, validateForm} = useForm<LoginFormData>(
  {
    email: loadSavedEmail(),
    password: '',
  },
  loginSchema,
  t
)

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      saveEmail(form.email)
      await login({
        email: form.email,
        password: form.password,
      })
    } catch (error) {
      // Error is handled in useAuth
    }
  }
}
</script>

<template>
  <FormComponent
    :title="$t('auth.loginTitle')"
    :subtitle="$t('auth.loginSubtitle')"
    max-width="md"
    @submit="handleSubmit"
  >
    <FormFieldComponent>
      <InputComponent
        v-model="form.email"
        type="email"
        :label="$t('auth.email')"
        :placeholder="$t('auth.emailPlaceholder')"
        :error="errors.email"
        :required="true"
        clearable
        @blur="validateField('email')"
      >
        <template #icon>
          <EmailIcon :label="$t('auth.email')"/>
        </template>
      </InputComponent>
    </FormFieldComponent>

    <FormFieldComponent>
      <InputComponent
        v-model="form.password"
        type="password"
        :label="$t('auth.password')"
        :placeholder="$t('auth.passwordPlaceholder')"
        :error="errors.password"
        :required="true"
        :show-password-toggle="true"
        @blur="validateField('password')"
      />
    </FormFieldComponent>

    <FormFieldComponent gap="sm">
      <CheckboxComponent
        v-model="rememberMe"
        :label="$t('auth.rememberMe')"
        size="sm"
      />
    </FormFieldComponent>

    <FormFieldComponent>
      <ButtonComponent
        type="submit"
        variant="primary"
        size="lg"
        :loading="loading"
        :disabled="loading"
        full-width
      >
        <template #icon>
          <SubmitIcon :label="$t('icon.submit')"/>
        </template>
        {{ $t('auth.login') }}
      </ButtonComponent>
    </FormFieldComponent>

    <template #footer>
      {{ $t('auth.noAccount') }}
      <router-link to="/register">
        {{ $t('auth.register') }}
      </router-link>
    </template>
  </FormComponent>
</template>
