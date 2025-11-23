<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {createAuthSchemas, type LoginFormData} from '@entities/auth/model/validation/auth.validation.ts'
import {useAuth} from '../../model/useAuth.ts'
import {useForm} from '@shared/composables/useForm.ts'
import CheckboxComponent from "@shared/ui/components/atoms/CheckBoxComponent/CheckboxComponent.vue"
import PasswordIcon from "@shared/ui/icons/PasswordIcon.vue";
import EmailIcon from "@shared/ui/icons/EmailIcon.vue";
import SubmitIcon from "@shared/ui/icons/SubmitIcon.vue";
import CardComponent from "@shared/ui/components/atoms/CardComponent/CardComponent.vue";
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue";
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";

const {t} = useI18n()
const {loginSchema} = createAuthSchemas(t)
const {login, loading} = useAuth()

const {form, errors, validateField, validateForm} = useForm<LoginFormData>(
  {
    email: '',
    password: '',
  },
  loginSchema
)

const rememberMe = ref(false)

const handleSubmit = async () => {
  if (validateForm()) {
    try {
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
  <CardComponent
    class="login-form-card"
    variant="elevated"
    padding="lg"
  >
    <div class="form-container">
      <div class="form-header">
        <h1 class="form-title">{{ $t('auth.loginTitle') }}</h1>
        <p class="form-subtitle">{{ $t('auth.loginSubtitle') }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
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

        <div class="form-options">
          <CheckboxComponent
            v-model="rememberMe"
            :label="$t('auth.rememberMe')"
            size="sm"
          />
          <router-link to="/forgot-password" class="forgot-password-link">
            {{ $t('auth.forgotPassword') }}
          </router-link>
        </div>

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

        <div class="form-footer">
          <p class="footer-text">
            {{ $t('auth.noAccount') }}
            <router-link to="/register" class="register-link">
              {{ $t('auth.register') }}
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </CardComponent>
</template>

<style scoped lang="scss" src="./LoginForm.scss"></style>
