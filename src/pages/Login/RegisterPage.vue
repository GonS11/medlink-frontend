<script setup lang="ts">
import RegisterForm from '@features/auth/ui/RegisterForm.vue'
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-branding">
        <div class="logo-container">
          <div class="logo">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect width="60" height="60" rx="14" fill="url(#gradient)"/>
              <path d="M30 15L15 25V40L30 50L45 40V25L30 15Z" fill="white" opacity="0.95"/>
              <path d="M30 20L22 26V38L30 44L38 38V26L30 20Z" fill="url(#gradient2)"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="60" y2="60">
                  <stop stop-color="#00C896"/>
                  <stop offset="1" stop-color="#009573"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="22" y1="20" x2="38" y2="44">
                  <stop stop-color="#00C896"/>
                  <stop offset="1" stop-color="#0066CC"/>
                </linearGradient>
              </defs>
            </svg>
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
@import '@/shared/styles/variables.scss';

.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  background: linear-gradient(135deg, $bg-secondary 0%, $bg-tertiary 100%);
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
  background: linear-gradient(135deg, $secondary 0%, $secondary-dark 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: $font-size-xl;
  color: $text-secondary;
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