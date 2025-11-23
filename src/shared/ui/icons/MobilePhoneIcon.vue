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
    <rect
      x="4"
      y="2"
      width="12"
      height="16"
      rx="2"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      d="M10 15H10.01"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>
