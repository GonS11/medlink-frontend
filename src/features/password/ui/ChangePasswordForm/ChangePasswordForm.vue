<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useAuthStore} from "@entities/auth/model/store/auth.store.ts";
import {computed, ref} from "vue";
import {useUserCrud} from "@entities/user/model/composables/useUserCrud.ts";
import {createUserSchemas, ChangePasswordFormData} from "@entities/user/model/validation/user.validation.ts";
import {useForm} from "@shared/composables/useForm.ts";
import {useUserAdmin} from "@entities/user/model/composables/useUserAdmin.ts";
import FormComponent from "@shared/ui/components/atoms/FormComponent/FormComponent.vue";
import FormLayout from "@shared/ui/components/atoms/FormLayout/FormLayout.vue";
import InputComponent from "@shared/ui/components/atoms/InputComponent/InputComponent.vue";
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import ChevronLeftIcon from "@shared/ui/icons/ChevronLeftIcon.vue";
import CheckIcon from "@shared/ui/icons/CheckIcon.vue";
import XIcon from "@shared/ui/icons/XIcon.vue";
import SubmitIcon from "@shared/ui/icons/SubmitIcon.vue";
import {ROUTES} from "@shared/constants/routes.constants.ts";

withDefaults(defineProps<{
  showBackBtn?: boolean
}>(), {
  showBackBtn: false
})

const {t} = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const currentUserId = computed(() => authStore.currentUser?.userId)

const {changePassword} = useUserAdmin()
const {loading} = useUserCrud()
const {changePasswordSchema} = createUserSchemas(t)

const {form, errors, validateForm, resetForm, handleBlur} = useForm<ChangePasswordFormData>(
  {newPassword: '', confirmNewPassword: ''},
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
    {label: t('validation.minLength', {field: password, min: minLength}), met: isLongEnough},
    {label: t('validation.password.lowercase'), met: hasLowercase},
    {label: t('validation.password.uppercase'), met: hasUppercase},
    {label: t('validation.password.number'), met: hasNumber},
  ]
})

const allRequirementsMet = computed(() => passwordRequirements.value.every(req => req.met))
const passwordsMatch = computed(() => form.newPassword && form.confirmNewPassword && form.newPassword === form.confirmNewPassword)
const isFormValid = computed(() => allRequirementsMet.value && passwordsMatch.value && form.newPassword.length > 0 && form.confirmNewPassword.length > 0)

const goBack = () => router.push(ROUTES.LOGIN)

const handleSubmit = async () => {
  if (!validateForm() || !currentUserId.value) return

  try {
    await changePassword(currentUserId.value, {newPassword: form.newPassword})
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
    class="password-change"
    variant="borderless"
    max-width="md"
    :centered="false"
    :loading="loading"
    @submit="handleSubmit"
  >
    <template #header>
      <div class="password-change__header">
        <div v-if="showBackBtn" class="password-change__back">
          <ButtonComponent variant="ghost" size="sm" @click="goBack">
            <template #icon>
              <ChevronLeftIcon :label="$t('common.back')"/>
            </template>
            {{ $t('common.back') }}
          </ButtonComponent>
        </div>

        <h1 class="password-change__title">{{ $t('entities.user.password.title') }}</h1>
        <div v-if="isSuccess" class="password-change__alert password-change__alert--success">
          {{ $t('entities.user.password.success') }}
        </div>
        <p v-else class="password-change__subtitle">{{ $t('entities.user.password.subtitle') }}</p>
      </div>
    </template>

    <FormLayout gap="lg">
      <InputComponent
        v-model="form.newPassword"
        type="password"
        :label="$t('entities.user.password.new')"
        :placeholder="$t('entities.user.password.placeholder')"
        :error="errors.newPassword"
        required
        show-password-toggle
        @blur="handleBlur('newPassword')"
      />

      <div v-if="form.newPassword" class="password-change__requirements">
        <h4 class="password-change__requirements-title">{{ $t('entities.user.password.requirements') }}</h4>
        <ul class="password-change__list">
          <li
            v-for="(req, index) in passwordRequirements"
            :key="index"
            class="password-change__item"
            :class="{ 'password-change__item--met': req.met }"
          >
            <component
              :is="req.met ? CheckIcon : XIcon"
              class="password-change__item-icon"
              :label="req.met ? $t('icons.check') : $t('icons.error')"
            />
            <span>{{ req.label }}</span>
          </li>
        </ul>
      </div>

      <InputComponent
        v-model="form.confirmNewPassword"
        type="password"
        :label="$t('entities.user.password.confirm')"
        :placeholder="$t('entities.user.password.confirmPlaceholder')"
        :error="errors.confirmNewPassword"
        required
        show-password-toggle
        @blur="handleBlur('confirmNewPassword')"
      />

      <div v-if="form.confirmNewPassword" class="password-change__match"
           :class="passwordsMatch ? 'password-change__match--success' : 'password-change__match--error'">
        <component
          :is="passwordsMatch ? CheckIcon : XIcon"
          class="password-change__match-icon"
          :label="passwordsMatch ? $t('icons.check') : $t('icons.error')"
        />
        <span>{{ passwordsMatch ? $t('validation.passwordsMatch') : $t('validation.passwordsDontMatch') }}</span>
      </div>
    </FormLayout>

    <template #footer>
      <ButtonComponent
        type="submit"
        variant="primary"
        size="lg"
        full-width
        :disabled="loading || !isFormValid"
      >
        <template #icon>
          <SubmitIcon :label="$t('common.submit')"/>
        </template>
        {{ $t('entities.user.password.change') }}
      </ButtonComponent>
    </template>
  </FormComponent>
</template>

<style scoped lang="scss" src="./ChangePasswordForm.scss"></style>
