<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <svg
    :aria-label="label"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="7"
      r="4"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      d="M3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
