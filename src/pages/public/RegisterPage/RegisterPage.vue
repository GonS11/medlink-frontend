<script setup lang="ts">
import RegisterForm from '@features/auth/ui/forms/RegisterForm/RegisterForm.vue'
import AuthPageBranding from "@features/auth/ui/components/atoms/AuthPageBranding.vue";
</script>

<template>
  <div class="register-page">
    <div class="register-page__container">
      <div class="register-page__branding">
        <AuthPageBranding variant="register" />
      </div>

      <div class="register-page__form">
        <RegisterForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="RegisterPage.scss"></style>
