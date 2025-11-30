<script setup lang="ts">
import {computed, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router'
import {useForm} from '@shared/composables/useForm.ts'
import {ROUTES} from '@shared/constants/app.constants.ts'
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue"
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue"
import SubmitIcon from "@shared/ui/icons/SubmitIcon.vue"
import CheckIcon from "@shared/ui/icons/CheckIcon.vue"
import XIcon from "@shared/ui/icons/XIcon.vue"
import ChevronLeftIcon from "@shared/ui/icons/ChevronLeftIcon.vue"
import {
  createUserSchemas,
  type ChangePasswordFormData
} from "@entities/user/model/validation/user.validation.ts"
import {useAuthStore} from "@entities/auth/model/store/auth.store.ts"
import {useUser} from "@features/user/model/useUser.ts"
import FormComponent from "@shared/ui/components/atoms/FormComponent/FormComponent.vue";
import FormFieldComponent from "@shared/ui/components/atoms/FormFieldComponent/FormFieldComponent.vue";

withDefaults(defineProps<{
  showBackBtn?: boolean
}>(), {
  showBackBtn: false
})

const {t} = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const currentUserId = computed(() => authStore.currentUser?.userId)

const {changePassword, loading} = useUser()
const {changePasswordSchema} = createUserSchemas(t)

const {form, errors, validateForm, resetForm, handleBlur} = useForm<ChangePasswordFormData>(
  {
    newPassword: '',
    confirmNewPassword: '',
  },
  changePasswordSchema,
  t
)

const isSuccess = ref(false)
const minLength = 8

const passwordRequirements = computed(() => {
  const password = form.newPassword
  const hasLowercase = /[a-z]/.test(password)
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const isLongEnough = password.length >= minLength

  return [
    {
      label: t('validation.passwordMinLength', {min: minLength}),
      met: isLongEnough
    },
    {
      label: t('validation.passwordLowercase'),
      met: hasLowercase
    },
    {
      label: t('validation.passwordUppercase'),
      met: hasUppercase
    },
    {
      label: t('validation.passwordNumber'),
      met: hasNumber
    },
  ]
})

const allRequirementsMet = computed(() =>
  passwordRequirements.value.every(req => req.met)
)

const passwordsMatch = computed(() =>
  form.newPassword && form.confirmNewPassword &&
  form.newPassword === form.confirmNewPassword
)

const isFormValid = computed(() => {
  return allRequirementsMet.value &&
    passwordsMatch.value &&
    form.newPassword.length > 0 &&
    form.confirmNewPassword.length > 0
})

const goBack = () => {
  router.push(ROUTES.LOGIN)
}

const handleSubmit = async () => {
  if (!validateForm() || !currentUserId.value) {
    return
  }

  try {
    await changePassword(currentUserId.value, {
      newPassword: form.newPassword
    })

    isSuccess.value = true
    resetForm()

    setTimeout(() => {
      isSuccess.value = false
      router.push(ROUTES.PROFILE)
    }, 2000)

  } catch (error) {
    isSuccess.value = false
  }
}
</script>

<template>
  <FormComponent
    variant="borderless"
    max-width="md"
    :centered="false"
    @submit="handleSubmit"
  >
    <template #header>
      <div class="change-password-form">
        <div v-if="showBackBtn" class="change-password-form__back">
          <ButtonComponent
            variant="ghost"
            size="sm"
            @click="goBack"
          >
            <template #icon>
              <ChevronLeftIcon :label="$t('icon.arrowLeft')"/>
            </template>
            {{ $t('common.back') }}
          </ButtonComponent>
        </div>

        <div class="change-password-form__header">
          <h1 class="change-password-form__title">
            {{ $t('user.changePasswordTitle') }}
          </h1>
          <p
            v-if="isSuccess"
            class="change-password-form__message change-password-form__message--success"
          >
            {{ $t('user.passwordChangeSuccess') }}
          </p>
          <p
            v-else
            class="change-password-form__subtitle"
          >
            {{ $t('user.changePasswordSubtitle') }}
          </p>
        </div>
      </div>
    </template>

    <FormFieldComponent>
      <InputComponent
        v-model="form.newPassword"
        type="password"
        :label="$t('user.newPassword')"
        :placeholder="$t('user.newPasswordPlaceholder')"
        :error="errors.newPassword"
        :required="true"
        :show-password-toggle="true"
        @blur="handleBlur('newPassword')"
      />
    </FormFieldComponent>

    <FormFieldComponent v-if="form.newPassword" class="change-password-form">
      <div class="change-password-form__requirements">
        <h4 class="change-password-form__requirements-title">
          {{ $t('user.passwordRequirements') }}
        </h4>
        <ul class="change-password-form__requirements-list">
          <li
            v-for="(requirement, index) in passwordRequirements"
            :key="index"
            :class="[
              'change-password-form__requirement',
              { 'change-password-form__requirement--met': requirement.met }
            ]"
          >
            <CheckIcon
              v-if="requirement.met"
              :modelValue="requirement.met"
              class="change-password-form__requirement-icon change-password-form__requirement-icon--success"
              :label="$t('icon.check')"
            />
            <XIcon
              v-else
              class="change-password-form__requirement-icon change-password-form__requirement-icon--error"
              :label="$t('icon.x')"
            />
            <span class="change-password-form__requirement-text">
              {{ requirement.label }}
            </span>
          </li>
        </ul>
      </div>
    </FormFieldComponent>

    <FormFieldComponent>
      <InputComponent
        v-model="form.confirmNewPassword"
        type="password"
        :label="$t('user.confirmNewPassword')"
        :placeholder="$t('user.confirmNewPasswordPlaceholder')"
        :error="errors.confirmNewPassword"
        :required="true"
        :show-password-toggle="true"
        @blur="handleBlur('confirmNewPassword')"
      />
    </FormFieldComponent>

    <FormFieldComponent v-if="form.confirmNewPassword" class="change-password-form">
      <div
        :class="[
          'change-password-form__match',
          {
            'change-password-form__match--success': passwordsMatch,
            'change-password-form__match--error': !passwordsMatch
          }
        ]"
      >
        <CheckIcon
          v-if="passwordsMatch"
          :modelValue="passwordsMatch"
          class="change-password-form__match-icon"
          :label="$t('icon.check')"
        />
        <XIcon
          v-else
          class="change-password-form__match-icon"
          :label="$t('icon.x')"
        />
        <span class="change-password-form__match-text">
          {{ passwordsMatch ? $t('validation.passwordsMatch') : $t('validation.passwordsDontMatch') }}
        </span>
      </div>
    </FormFieldComponent>

    <FormFieldComponent>
      <ButtonComponent
        type="submit"
        variant="primary"
        size="lg"
        :loading="loading"
        :disabled="loading || !isFormValid"
        full-width
      >
        <template #icon>
          <SubmitIcon :label="$t('icon.submit')"/>
        </template>
        {{ $t('user.changePasswordButton') }}
      </ButtonComponent>
    </FormFieldComponent>
  </FormComponent>
</template>

<style scoped lang="scss" src="./ChangePasswordForm.scss"></style>
