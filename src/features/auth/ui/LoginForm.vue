<script setup lang="ts">
import {ref} from 'vue'
import {loginSchema, type LoginFormData} from '@entities/auth/model/validation/auth.validation'
import {useAuth} from '../model/useAuth'
import {useForm} from '@shared/composables/useForm'
import CardComponent from "@shared/ui/components/CardComponent.vue";
import InputComponent from "@shared/ui/components/InputComponent.vue";
import ButtonComponent from "@shared/ui/components/ButtonComponent.vue";

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
  <CardComponent class="login-form-card" variant="elevated" padding="lg">
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
          :placeholder="$t('auth.email')"
          :error="errors.email"
          :required="true"
          @blur="validateField('email')"
        />

        <InputComponent
          v-model="form.password"
          type="password"
          :label="$t('auth.password')"
          :placeholder="$t('auth.password')"
          :error="errors.password"
          :required="true"
          @blur="validateField('password')"
        />

        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="rememberMe"/>
            <span>{{ $t('auth.rememberMe') }}</span>
          </label>
          <a href="#" class="forgot-password">{{ $t('auth.forgotPassword') }}</a>
        </div>

        <ButtonComponent
          type="submit"
          variant="primary"
          size="lg"
          :loading="loading"
          :disabled="loading"
          full-width
        >
          {{ $t('auth.login') }}
        </ButtonComponent>

        <div class="form-footer">
          <p>
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


<style scoped lang="scss">
@import '@/shared/styles/variables.scss';

.login-form-card {
  width: 100%;
  max-width: 480px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}

.form-header {
  text-align: center;
}

.form-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-sm;
  background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-subtitle {
  font-size: $font-size-base;
  color: $text-secondary;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: $font-size-sm;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  cursor: pointer;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: $primary;
  }
}

.forgot-password {
  color: $primary;
  font-weight: $font-weight-medium;
  transition: color $transition-fast;

  &:hover {
    color: $primary-dark;
  }
}

.form-footer {
  text-align: center;
  font-size: $font-size-sm;
  color: $text-secondary;

  p {
    margin: 0;
  }
}

.register-link {
  color: $primary;
  font-weight: $font-weight-semibold;
  transition: color $transition-fast;

  &:hover {
    color: $primary-dark;
  }
}
</style>
