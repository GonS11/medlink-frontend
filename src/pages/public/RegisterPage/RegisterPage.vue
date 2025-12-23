<script setup lang="ts">
import RegisterForm from '@features/auth/ui/RegisterForm/RegisterForm.vue'
import AuthPageBranding from "@features/auth/ui/AuthPageBranding/AuthPageBranding.vue"
</script>

<template>
  <main class="auth-page auth-page--register">
    <div class="auth-page__container">

      <section class="auth-page__content">
        <div class="auth-page__form-wrapper">
          <RegisterForm/>
        </div>
      </section>

      <section class="auth-page__branding">
        <AuthPageBranding variant="register"/>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss" src="./RegisterPage.scss"></style>
