<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <svg
    :aria-label="label"
    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 18.5V4H4V20H20V18.5H5.5Z" fill="currentColor"/>
    <path d="M10.5 17V8.00131H12V17H10.5Z" fill="currentColor"/>
    <path d="M7 17V12H8.5V17H7Z" fill="currentColor"/>
    <path d="M17.5 17V10H19V17H17.5Z" fill="currentColor"/>
    <path d="M14 17V5H15.5V17H14Z" fill="currentColor"/>
  </svg>
</template>
