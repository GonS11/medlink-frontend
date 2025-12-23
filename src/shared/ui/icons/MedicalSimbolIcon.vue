<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <svg
    :aria-label="label"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9 2H15V9H22V15H15V22H9V15H2V9H9V2ZM11 4V11H4V13H11V20H13V13H20V11H13V4H11Z"
      fill="currentColor"
    />
  </svg>
</template>
