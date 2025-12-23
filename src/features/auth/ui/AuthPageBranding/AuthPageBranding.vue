<script setup lang="ts">
import LogoIcon from "@shared/ui/icons/LogoIcon.vue"
import {AuthBrandingProps} from "@shared/types/component.atoms.types.ts";


withDefaults(defineProps<AuthBrandingProps>(), {
  variant: 'login'
})
</script>

<template>
  <div :class="['auth-branding', `auth-branding--${variant}`]">
    <div class="auth-branding__container">
      <div class="auth-branding__logo-wrapper">
        <LogoIcon class="auth-branding__logo" :label="$t('app.name')"/>
      </div>

      <div class="auth-branding__text">
        <h2 class="auth-branding__title">
          {{ $t('app.name') }}
        </h2>
        <div class="auth-branding__divider"></div>
        <p class="auth-branding__tagline">
          {{ variant === 'login' ? $t('app.tagline.login') : $t('app.tagline.register') }}
        </p>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss" src="./AuthPageBranding.scss"></style>
