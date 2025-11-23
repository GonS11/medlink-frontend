<script setup lang="ts">
import {registerSchema, type RegisterFormData} from '@entities/auth/model/validation/auth.validation'
import {useAuth} from '../model/useAuth'
import {useForm} from '@shared/composables/useForm'
import CardComponent from "@shared/ui/components/atoms/CardComponent/CardComponent.vue";
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue";
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import {UserRoleArray} from "@shared/types/api.types.ts";
import {RegisterRequest} from "@entities/auth/model/auth.types.ts";

const {register, loading} = useAuth()
const roles = Object.values(UserRoleArray)

const {form, errors, validateField, validateForm} = useForm<RegisterFormData>(
  {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    mobilePhone: '',
    role: null as any,
  },
  registerSchema
)

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const {confirmPassword, ...formDataWithoutConfirm} = form
      const registerData = formDataWithoutConfirm as unknown as RegisterRequest

      await register(registerData)
    } catch (error) {
      // Error handled in useAuth
    }
  }
}
</script>

<template>
  <CardComponent class="register-form-card" variant="default" padding="lg">
    <div class="form-container">
      <div class="form-header">
        <h1 class="form-title">{{ $t('auth.registerTitle') }}</h1>
        <p class="form-subtitle">{{ $t('auth.registerSubtitle') }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-row">
          <InputComponent
            v-model="form.firstName"
            type="text"
            :label="$t('user.firstName')"
            :error="errors.firstName"
            :required="true"
            @blur="validateField('firstName')"
          />
          <InputComponent
            v-model="form.lastName"
            type="text"
            :label="$t('user.lastName')"
            :error="errors.lastName"
            :required="true"
            @blur="validateField('lastName')"
          />
        </div>

        <InputComponent
          v-model="form.secondLastName"
          type="text"
          :label="$t('user.secondLastName')"
          :error="errors.secondLastName"
          @blur="validateField('secondLastName')"
        />

        <InputComponent
          v-model="form.email"
          type="email"
          :label="$t('auth.email')"
          :error="errors.email"
          :required="true"
          @blur="validateField('email')"
        />

        <div class="form-row">
          <InputComponent
            v-model="form.phone"
            type="tel"
            :label="$t('user.phone')"
            :error="errors.phone"
            @blur="validateField('phone')"
          />
          <InputComponent
            v-model="form.mobilePhone"
            type="tel"
            :label="$t('user.mobilePhone')"
            :error="errors.mobilePhone"
            @blur="validateField('mobilePhone')"
          />
        </div>

        <div class="form-select">
          <label class="input-label">
            {{ $t('user.role') }} <span class="required">*</span>
          </label>
          <select v-model="form.role" class="select" @blur="validateField('role')">
            <option value="">Select role</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ $t(`roles.${role}`) }}
            </option>
          </select>
          <p v-if="errors.role" class="input-error">{{ errors.role }}</p>
        </div>

        <InputComponent
          v-model="form.password"
          type="password"
          :label="$t('auth.password')"
          :error="errors.password"
          :required="true"
          @blur="validateField('password')"
        />

        <InputComponent
          v-model="form.confirmPassword"
          type="password"
          :label="$t('auth.confirmPassword')"
          :error="errors.confirmPassword"
          :required="true"
          @blur="validateField('confirmPassword')"
        />

        <ButtonComponent
          type="submit"
          variant="primary"
          size="lg"
          :loading="loading"
          :disabled="loading"
          full-width
        >
          {{ $t('auth.register') }}
        </ButtonComponent>

        <div class="form-footer">
          <p>
            {{ $t('auth.hasAccount') }}
            <router-link to="/login" class="login-link">
              {{ $t('auth.login') }}
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </CardComponent>
</template>


<style scoped lang="scss">
@use '@/shared/styles/_variables' as *;

.register-form-card {
  width: 100%;
  max-width: 600px;
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
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form-subtitle {
  font-size: $font-size-base;
  color: var(--text-secondary);
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-lg;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.form-select {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.select {
  padding: $spacing-md;
  font-family: $font-family-base;
  font-size: $font-size-base;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 2px solid var(--border-color);
  border-radius: $radius-lg;
  transition: all var(--transition-base);
  cursor: pointer;

  &:hover {
    border-color: var(--border-dark);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.1);
  }
}

.input-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: var(--text-primary);

  .required {
    color: var(--color-error);
  }
}

.input-error {
  font-size: $font-size-sm;
  color: var(--color-error);
  margin: 0;
}

.form-footer {
  text-align: center;
  font-size: $font-size-sm;
  color: var(--text-secondary);

  p {
    margin: 0;
  }
}

.login-link {
  color: var(--color-primary);
  font-weight: $font-weight-semibold;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-primary-dark);
  }
}
</style>
