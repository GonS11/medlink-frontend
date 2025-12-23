<script setup lang="ts">
import {useAuth} from '@features/auth/model/composables/useAuth'
import LoginForm from '@features/auth/ui/LoginForm/LoginForm.vue'
import AuthPageBranding from "@features/auth/ui/AuthPageBranding/AuthPageBranding.vue"
import type {LoginRequest} from '@entities/auth/model/types/auth.types'

const {login, loading} = useAuth()

const handleLogin = async (credentials: LoginRequest) => {
  await login(credentials)
}
</script>

<template>
  <main class="auth-page auth-page--login">
    <div class="auth-page__container">
      <section class="auth-page__branding">
        <AuthPageBranding variant="login"/>
      </section>

      <section class="auth-page__content">
        <div class="auth-page__form-wrapper">
          <LoginForm
            :loading="loading"
            @submit="handleLogin"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss" src="./LoginPage.scss"></style>
