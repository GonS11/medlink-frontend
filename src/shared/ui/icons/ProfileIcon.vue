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
      d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.34315 15.6569C7.84344 14.1566 9.87827 13.25 12 13.25C14.1217 13.25 16.1566 14.1566 17.6569 15.6569C19.1571 17.1571 20.0638 19.192 20.0638 21.3137V22H3.93628V21.3137C3.93628 19.192 4.84286 17.1571 6.34315 15.6569Z"
      fill="currentColor"
    />
  </svg>
</template>
