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
    <path
      d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V4Z"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      d="M3 4L10 11L17 4"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
