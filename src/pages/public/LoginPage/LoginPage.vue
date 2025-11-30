<script setup lang="ts">
import LoginForm from '@features/auth/ui/forms/LoginForm/LoginForm.vue'
import AuthPageBranding from "@features/auth/ui/components/atoms/AuthPageBranding.vue";
</script>

<template>
  <div class="login-page">
    <div class="login-page__container">
      <div class="login-page__branding">
        <AuthPageBranding variant="login"/>
      </div>

      <div class="login-page__form">
        <LoginForm/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="LoginPage.scss"></style>
