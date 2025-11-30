<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <svg
    :aria-label="label"
    class="spinner-icon"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="spinner-icon__circle"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="2.5"
      fill="none"
    />
  </svg>
</template>

<style scoped lang="scss">
.spinner-icon {
  animation: spinner-icon-rotate 1s linear infinite;

  &__circle {
    stroke-dasharray: 50, 200;
    stroke-dashoffset: 0;
    animation: spinner-icon-dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }
}

@keyframes spinner-icon-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-icon-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -125px;
  }
}
</style>
