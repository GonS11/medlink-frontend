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
      d="M3 3H7L9 8L6.5 9.5C7.57096 11.6715 9.32855 13.429 11.5 14.5L13 12L18 14V18C18 18.5523 17.5523 19 17 19C8.71573 19 2 12.2843 2 4C2 3.44772 2.44772 3 3 3Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
  </svg>
</template>
