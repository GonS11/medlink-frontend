<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {createAuthSchemas, type RegisterFormData} from '@entities/auth/model/validation/auth.validation'
import {useForm} from '@shared/composables/useForm'
import SelectComponent from "@shared/ui/components/atoms/SelectComponent/SelectComponent.vue"
import FormRowComponent from "@shared/ui/components/atoms/FormRowComponent/FormRowComponent.vue"
import FormFieldsetComponent from "@shared/ui/components/atoms/FormFieldsetComponent/FormFieldsetComponent.vue"
import {UserRoleArray} from "@shared/types/api.types.ts"
import {RegisterRequest} from "@entities/auth/model/auth.types.ts"
import SubmitIcon from "@shared/ui/icons/SubmitIcon.vue";
import PasswordIcon from "@shared/ui/icons/PasswordIcon.vue";
import UserIcon from "@shared/ui/icons/UserIcon.vue";
import EmailIcon from "@shared/ui/icons/EmailIcon.vue";
import PhoneIcon from "@shared/ui/icons/PhoneIcon.vue";
import MobilePhoneIcon from "@shared/ui/icons/MobilePhoneIcon.vue";

import {useAuth} from "@features/auth/model/useAuth.ts";
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue";
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import CardComponent from "@shared/ui/components/atoms/CardComponent/CardComponent.vue";

const {t} = useI18n()
const {registerSchema} = createAuthSchemas(t)
const {register, loading} = useAuth()

const roleOptions = computed(() =>
  Object.values(UserRoleArray).map(role => ({
    value: role,
    label: t(`roles.${role}`)
  }))
)

const initialFormData: RegisterFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  secondLastName: '',
  phone: '',
  mobilePhone: '',
  role: null as any,
}

const {form, errors, validateField, validateForm} = useForm<RegisterFormData>(
  initialFormData,
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
  <CardComponent
    class="register-form-card"
    variant="elevated"
    padding="lg"
  >
    <div class="form-container">
      <div class="form-header">
        <h1 class="form-title">{{ $t('auth.registerTitle') }}</h1>
        <p class="form-subtitle">{{ $t('auth.registerSubtitle') }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="form">

        <FormFieldsetComponent
          :legend="$t('user.personalInfo')"
          :description="$t('user.personalInfoDescription')"
          variant="default"
        >
          <FormRowComponent :columns="2" gap="lg" :responsive="true">
            <InputComponent
              v-model="form.firstName"
              type="text"
              :label="$t('user.firstName')"
              :error="errors.firstName"
              :required="true"
              clearable
              @blur="validateField('firstName')"
            >
              <template #icon>
                <UserIcon :label="$t('icon.user')"/>
              </template>
            </InputComponent>

            <InputComponent
              v-model="form.lastName"
              type="text"
              :label="$t('user.lastName')"
              :error="errors.lastName"
              :required="true"
              clearable
              @blur="validateField('lastName')"
            />
          </FormRowComponent>

          <InputComponent
            v-model="form.secondLastName"
            type="text"
            :label="$t('user.secondLastName')"
            :error="errors.secondLastName"
            clearable
            @blur="validateField('secondLastName')"
          />
        </FormFieldsetComponent>

        <FormFieldsetComponent
          :legend="$t('user.contactInfo')"
          :description="$t('user.contactInfoDescription')"
          variant="default"
        >
          <InputComponent
            v-model="form.email"
            type="email"
            :label="$t('auth.email')"
            :error="errors.email"
            :required="true"
            clearable
            @blur="validateField('email')"
          >
            <template #icon>
              <EmailIcon :label="$t('icon.email')"/>
            </template>
          </InputComponent>

          <FormRowComponent :columns="2" gap="lg" :responsive="true">
            <InputComponent
              v-model="form.phone"
              type="tel"
              :label="$t('user.phone')"
              :error="errors.phone"
              clearable
              @blur="validateField('phone')"
            >
              <template #icon>
                <PhoneIcon :label="$t('icon.phone')"/>
              </template>
            </InputComponent>

            <InputComponent
              v-model="form.mobilePhone"
              type="tel"
              :label="$t('user.mobilePhone')"
              :error="errors.mobilePhone"
              clearable
              @blur="validateField('mobilePhone')"
            >
              <template #icon>
                <MobilePhoneIcon :label="$t('icon.mobilePhone')"/>
              </template>
            </InputComponent>
          </FormRowComponent>
        </FormFieldsetComponent>

        <SelectComponent
          v-model="form.role"
          :label="$t('user.role')"
          :error="errors.role"
          :required="true"
          :options="roleOptions"
          :placeholder="$t('user.selectRole')"
          @blur="validateField('role')"
        />

        <FormFieldsetComponent
          :legend="$t('auth.security')"
          :description="$t('auth.securityDescription')"
          variant="default"
        >
          <InputComponent
            v-model="form.password"
            type="password"
            :label="$t('auth.password')"
            :error="errors.password"
            :required="true"
            :show-password-toggle="true"
            @blur="validateField('password')"
          >
            <template #icon>
              <PasswordIcon :label="t('icon.password')" :isPasswordVisible="false"/>
            </template>
          </InputComponent>

          <InputComponent
            v-model="form.confirmPassword"
            type="password"
            :label="$t('auth.confirmPassword')"
            :error="errors.confirmPassword"
            :required="true"
            :show-password-toggle="true"
            @blur="validateField('confirmPassword')"
          >
            <template #icon>
              <PasswordIcon :label="t('icon.password')" :isPasswordVisible="false"/>
            </template>
          </InputComponent>
        </FormFieldsetComponent>

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
          {{ $t('auth.register') }}
        </ButtonComponent>

        <div class="form-footer">
          <p class="footer-text">
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

<style scoped lang="scss" src="./RegisterForm.scss"></style>
