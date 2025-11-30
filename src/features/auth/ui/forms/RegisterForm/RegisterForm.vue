<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {createAuthSchemas, type RegisterFormData} from '@entities/auth/model/validation/auth.validation.ts'
import {useForm} from '@shared/composables/useForm.ts'
import {useAuth} from "@features/auth/model/composables/useAuth.ts"
import {UserRoleArray} from "@shared/types/api.types.ts"
import {RegisterRequest} from "@entities/auth/model/auth.types.ts"
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue"
import SelectComponent from "@shared/ui/components/atoms/SelectComponent/SelectComponent.vue"
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue"
import UserIcon from "@shared/ui/icons/UserIcon.vue"
import EmailIcon from "@shared/ui/icons/EmailIcon.vue"
import PhoneIcon from "@shared/ui/icons/PhoneIcon.vue"
import MobilePhoneIcon from "@shared/ui/icons/MobilePhoneIcon.vue"
import SubmitIcon from "@shared/ui/icons/SubmitIcon.vue"
import FormComponent from "@shared/ui/components/atoms/FormComponent/FormComponent.vue";
import FormFieldComponent from "@shared/ui/components/atoms/FormFieldComponent/FormFieldComponent.vue";

const {t} = useI18n()
const {registerSchema} = createAuthSchemas(t)
const {register, loading} = useAuth()

const roleOptions = computed(() =>
  Object.values(UserRoleArray).map(role => ({
    value: role,
    label: t(`roles.${role}`)
  }))
)

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
  registerSchema,
  t
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
  <FormComponent
    :title="$t('auth.registerTitle')"
    :subtitle="$t('auth.registerSubtitle')"
    max-width="lg"
    @submit="handleSubmit"
  >
    <FormFieldComponent
      :legend="$t('user.personalInfo')"
      :description="$t('user.personalInfoDescription')"
    >
      <FormFieldComponent :columns="2">
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
      </FormFieldComponent>

      <InputComponent
        v-model="form.secondLastName"
        type="text"
        :label="$t('user.secondLastName')"
        :error="errors.secondLastName"
        clearable
        @blur="validateField('secondLastName')"
      />
    </FormFieldComponent>

    <FormFieldComponent
      :legend="$t('user.contactInfo')"
      :description="$t('user.contactInfoDescription')"
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

      <FormFieldComponent :columns="2">
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
      </FormFieldComponent>
    </FormFieldComponent>

    <FormFieldComponent>
      <SelectComponent
        v-model="form.role"
        :label="$t('user.role')"
        :error="errors.role"
        :required="true"
        :options="roleOptions"
        :placeholder="$t('user.selectRole')"
        @blur="validateField('role')"
      />
    </FormFieldComponent>

    <FormFieldComponent
      :legend="$t('auth.security')"
      :description="$t('auth.securityDescription')"
    >
      <InputComponent
        v-model="form.password"
        type="password"
        :label="$t('auth.password')"
        :error="errors.password"
        :required="true"
        :show-password-toggle="true"
        @blur="validateField('password')"
      />

      <InputComponent
        v-model="form.confirmPassword"
        type="password"
        :label="$t('auth.confirmPassword')"
        :error="errors.confirmPassword"
        :required="true"
        :show-password-toggle="true"
        @blur="validateField('confirmPassword')"
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
        {{ $t('auth.register') }}
      </ButtonComponent>
    </FormFieldComponent>

    <template #footer>
      {{ $t('auth.hasAccount') }}
      <router-link to="/login">
        {{ $t('auth.login') }}
      </router-link>
    </template>
  </FormComponent>
</template>
