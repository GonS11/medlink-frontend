<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {getCurrentLanguageCode, setLanguage} from '@app/providers/i18n'
import {useRouter} from 'vue-router'

import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import CardComponent from '@shared/ui/components/atoms/CardComponent/CardComponent.vue'
import ChangePasswordForm from '@features/password/ui/ChangePasswordForm/ChangePasswordForm.vue'
import {LanguageCode, LanguageCodeType} from "@shared/types/enums.types.ts";

const {t} = useI18n()
const router = useRouter()

const languages = [
  {code: LanguageCode.EN, name: 'English'},
  {code: LanguageCode.ES, name: 'Español'},
  {code: LanguageCode.CA, name: 'Català'},
  {code: LanguageCode.EU, name: 'Euskara'},
  {code: LanguageCode.GL, name: 'Galego'},
]

const currentLanguage = computed(() => getCurrentLanguageCode())

const changeLanguage = (langCode: LanguageCodeType) => {
  setLanguage(langCode)
}
</script>

<template>
  <main class="settings-page">
    <header class="settings-page__header">
      <div class="settings-page__header-content">
        <h1 class="settings-page__title">{{ t('entities.user.settings') }}</h1>
      </div>
      <ButtonComponent variant="ghost" size="sm" @click="router.back()">
        ← {{ t('common.back') }}
      </ButtonComponent>
    </header>

    <div class="settings-page__grid">
      <CardComponent class="settings-page__card" variant="shadow" padding="xl">
        <template #header>
          <h3 class="settings-page__section-title">{{ t('entities.user.password.change') }}</h3>
        </template>
        <div class="settings-page__section-content">
          <ChangePasswordForm/>
        </div>
      </CardComponent>

      <CardComponent class="settings-page__card" variant="shadow" padding="xl">
        <template #header>
          <h3 class="settings-page__section-title">{{ t('fields.language') }}</h3>
        </template>
        <div class="settings-page__section-content">
          <p class="settings-page__description">{{ t('settings.languageDescription') }}</p>
          <div class="settings-page__languages">
            <ButtonComponent
              v-for="lang in languages"
              :key="lang.code"
              :variant="currentLanguage === lang.code ? 'primary' : 'outline'"
              class="settings-page__lang-btn"
              @click="changeLanguage(lang.code)"
            >
              {{ lang.name }}
            </ButtonComponent>
          </div>
        </div>
      </CardComponent>
    </div>
  </main>
</template>

<style scoped lang="scss" src="./SettingsPage.scss"></style>
