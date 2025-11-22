<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {useUser} from '@features/user/model/useUser'
import {changePasswordSchema, type ChangePasswordFormData} from '@entities/user/model/validation/user.validation'
import {useForm} from '@shared/composables/useForm'
import {setLanguage} from '@app/providers/i18n'
import ButtonComponent from "@shared/ui/components/ButtonComponent.vue";
import CardComponent from "@shared/ui/components/CardComponent.vue";
import InputComponent from "@shared/ui/components/InputComponent.vue";
import {useRouter} from "vue-router";

const {locale} = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const {changePassword, loading} = useUser()

const languages = [
  {code: 'en', name: 'English'},
  {code: 'es', name: 'Español'},
]

const currentLanguage = computed(() => locale.value)

const {form: passwordForm, errors: passwordErrors, validateForm} = useForm<ChangePasswordFormData>(
  {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  },
  changePasswordSchema
)

const handleChangePassword = async () => {
  if (validateForm()) {
    const userId = authStore.user?.userId
    if (!userId) return

    try {
      await changePassword(userId, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      // Clear form
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } catch (error) {
      // Error handled in useUser
    }
  }
}

const changeLanguage = (langCode: string) => {
  setLanguage(langCode)
}
</script>

<template>
  <div class="settings-page">
    <div class="settings-header">
      <h1>{{ $t('user.settings') }}</h1>
      <ButtonComponent variant="ghost" @click="router.back()">
        ← {{ $t('common.back') }}
      </ButtonComponent>
    </div>

    <div class="settings-grid">
      <CardComponent variant="elevated" padding="lg">
        <template #header>
          <h3>{{ $t('user.changePassword') }}</h3>
        </template>

        <form @submit.prevent="handleChangePassword" class="form">
          <InputComponent
            v-model="passwordForm.currentPassword"
            type="password"
            :label="$t('user.currentPassword')"
            :error="passwordErrors.currentPassword"
            :required="true"
          />

          <InputComponent
            v-model="passwordForm.newPassword"
            type="password"
            :label="$t('user.newPassword')"
            :error="passwordErrors.newPassword"
            :required="true"
          />

          <InputComponent
            v-model="passwordForm.confirmPassword"
            type="password"
            :label="$t('auth.confirmPassword')"
            :error="passwordErrors.confirmPassword"
            :required="true"
          />

          <ButtonComponent
            type="submit"
            variant="primary"
            :loading="loading"
            :disabled="loading"
          >
            {{ $t('user.changePassword') }}
          </ButtonComponent>
        </form>
      </CardComponent>

      <CardComponent variant="elevated" padding="lg">
        <template #header>
          <h3>{{ $t('user.preferredLanguage') }}</h3>
        </template>

        <div class="language-selector">
          <ButtonComponent
            v-for="lang in languages"
            :key="lang.code"
            :class="['language-btn', { active: currentLanguage === lang.code }]"
            @click="changeLanguage(lang.code)"
          >
            {{ lang.name }}
          </ButtonComponent>
        </div>
      </CardComponent>
    </div>
  </div>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables.scss';

.settings-page {
  padding: $spacing-2xl;
  max-width: 1200px;
  margin: 0 auto;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-2xl;

  h1 {
    font-size: $font-size-3xl;
    margin: 0;
  }
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: $spacing-xl;

  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.language-selector {
  display: flex;
  gap: $spacing-md;
}

.language-btn {
  flex: 1;
  padding: $spacing-md $spacing-lg;
  font-family: $font-family-base;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  color: $text-primary;
  background: transparent;
  border: 2px solid $border-color;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    border-color: $primary;
    color: $primary;
  }

  &.active {
    background: $primary;
    color: white;
    border-color: $primary;
  }
}
</style>
