<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <svg
    :aria-label="label"
    class="spinner"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      class="spinner-circle"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="3"
      fill="none"
    />
  </svg>
</template>
