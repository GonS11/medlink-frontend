<script setup lang="ts">
import {useLoginForm} from '@features/auth/model/composables/useLoginForm'
import type {LoginRequest} from '@entities/auth/model/types/auth.types'
import FormComponent from '@shared/ui/components/atoms/FormComponent/FormComponent.vue'
import FormLayout from '@shared/ui/components/atoms/FormLayout/FormLayout.vue'
import InputComponent from '@shared/ui/components/atoms/InputComponent/InputComponent.vue'
import CheckboxComponent from '@shared/ui/components/atoms/CheckBoxComponent/CheckboxComponent.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import EmailIcon from '@shared/ui/icons/EmailIcon.vue'
import SubmitIcon from '@shared/ui/icons/SubmitIcon.vue'

export interface LoginFormProps {
  loading?: boolean
}

withDefaults(defineProps<LoginFormProps>(), {
  loading: false
})

const emit = defineEmits<{
  submit: [data: LoginRequest]
}>()

const {form, errors, rememberMe, handleSubmit, handleInput, handleBlur} = useLoginForm({
  onSubmit: (data) => emit('submit', data)
})
</script>

<template>
  <FormComponent
    class="login-form"
    :title="$t('auth.loginTitle')"
    :subtitle="$t('auth.loginSubtitle')"
    max-width="md"
    :loading="loading"
    @submit.prevent="handleSubmit"
  >
    <FormLayout gap="lg">
      <InputComponent
        :model-value="form.email"
        type="email"
        :label="$t('fields.email')"
        :placeholder="$t('auth.emailPlaceholder')"
        :error="errors.email"
        required
        clearable
        @update:model-value="handleInput('email', $event)"
        @blur="handleBlur('email')"
      >
        <template #icon>
          <EmailIcon :label="$t('icons.email')"/>
        </template>
      </InputComponent>

      <InputComponent
        :model-value="form.password"
        type="password"
        :label="$t('fields.password')"
        :placeholder="$t('auth.passwordPlaceholder')"
        :error="errors.password"
        required
        show-password-toggle
        @update:model-value="handleInput('password', $event)"
        @blur="handleBlur('password')"
      />

      <CheckboxComponent
        :model-value="rememberMe"
        :label="$t('auth.rememberMe')"
        size="sm"
        @update:model-value="rememberMe = $event"
      />
    </FormLayout>

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
            <SubmitIcon :label="$t('icons.submit')"/>
          </template>
          {{ $t('auth.login') }}
        </ButtonComponent>
      </div>

      <p class="login-form__redirect">
        {{ $t('auth.noAccount') }}
        <router-link to="/register">
          {{ $t('auth.register') }}
        </router-link>
      </p>
    </template>
  </FormComponent>
</template>

<style scoped lang="scss" src="./LoginForm.scss"></style>
