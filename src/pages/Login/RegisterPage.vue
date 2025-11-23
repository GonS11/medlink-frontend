<script setup lang="ts">
import RegisterForm from '@features/auth/ui/RegisterForm.vue'
import LogoIcon from "@shared/ui/icons/LogoIcon.vue";
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-branding">
        <div class="logo-container">
          <div class="logo">
            <LogoIcon label="Logo"/>
          </div>
          <h2 class="brand-name">{{ $t('app.name') }}</h2>
          <p class="brand-tagline">{{ $t('app.tagline') }}</p>
        </div>
      </div>

      <div class="register-form-wrapper">
        <RegisterForm/>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
@use '@/shared/styles/_variables' as *;


.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
}

.register-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-3xl;
  align-items: center;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
    gap: $spacing-2xl;
  }
}

.register-branding {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.logo-container {
  animation: fadeInUp 0.6s ease-out;
}

.logo {
  margin-bottom: $spacing-xl;
  animation: float 3s ease-in-out infinite;
}

.brand-name {
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-sm;
  background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: $font-size-xl;
  color: var(--text-secondary);
  margin: 0;
}

.register-form-wrapper {
  display: flex;
  justify-content: center;
  animation: fadeInRight 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
