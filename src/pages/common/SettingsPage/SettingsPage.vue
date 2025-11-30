<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {setLanguage} from '@app/providers/i18n.ts'
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue"
import CardComponent from "@shared/ui/components/atoms/CardComponent/CardComponent.vue"
import {useRouter} from "vue-router"
import ChangePasswordForm from "@features/user/ui/forms/ChangePasswordForm/ChangePasswordForm.vue"

const {locale} = useI18n()
const router = useRouter()

const languages = [
  {code: 'en', name: 'English'},
  {code: 'es', name: 'Español'},
]

const currentLanguage = computed(() => locale.value)

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
      <CardComponent variant="borderless" padding="lg">
        <template #header>
          <h3>{{ $t('user.changePassword') }}</h3>
        </template>
        <ChangePasswordForm/>
      </CardComponent>

      <CardComponent variant="shadow" padding="lg">
        <template #header>
          <h3>{{ $t('user.preferredLanguage') }}</h3>
        </template>

        <div class="language-selector">
          <ButtonComponent
            v-for="lang in languages"
            :key="lang.code"
            :variant="currentLanguage === lang.code ? 'primary' : 'outline'"
            @click="changeLanguage(lang.code)"
          >
            {{ lang.name }}
          </ButtonComponent>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./SettingsPage.scss"></style>
