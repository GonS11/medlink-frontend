<script setup lang="ts">
import LogoIcon from "@shared/ui/icons/LogoIcon.vue"

interface AuthBrandingProps {
  variant?: 'login' | 'register'
}

withDefaults(defineProps<AuthBrandingProps>(), {
  variant: 'login'
})
</script>

<template>
  <div :class="['auth-branding', `auth-branding--${variant}`]">
    <div class="auth-branding__container">
      <div class="auth-branding__logo">
        <LogoIcon :label="$t('app.name')"/>
      </div>
      <h2 class="auth-branding__title">
        {{ $t('app.name') }}
      </h2>
      <p class="auth-branding__tagline">
        {{ variant === 'login' ? $t('app.taglineLogin') : $t('app.taglineRegister') }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AuthPageBranding.scss"></style>
