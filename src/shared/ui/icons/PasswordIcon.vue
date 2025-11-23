<script setup lang="ts">
defineProps<{
  label: string;
  isPasswordVisible: boolean;
}>();
</script>

<template>
  <svg
    v-if="!isPasswordVisible"
    :aria-label="label"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M2.5 10C2.5 10 5 4.5 10 4.5C15 4.5 17.5 10 17.5 10C17.5 10 15 15.5 10 15.5C5 15.5 2.5 10 2.5 10Z"
      stroke="currentColor"
      stroke-width="1.5"
    />
  </svg>
  <svg
    v-else
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3L17 17M10.5 7.5C11.3284 8.32843 11.3284 9.67157 10.5 10.5M7.5 10.5C6.67157 9.67157 6.67157 8.32843 7.5 7.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
