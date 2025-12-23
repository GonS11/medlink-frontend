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
      d="M12 2H9V3.5H3.2V2H0.2V23.8H4.4V19.3H7.4V23.8H9.9H12H21.8V9.4H12V2ZM9 9.4H7V11.6H5.2V9.4H3.2V7.5H5.2V5.4H7V7.5H9V9.4ZM13.8 19.3H12V17.4H13.8V19.3ZM13.8 15.7H12V13.8H13.8V15.7ZM17.5 19.3H15.7V17.4H17.5V19.3ZM17.5 15.7H15.7V13.8H17.5V15.7ZM21.2 19.3H19.3V17.4H21.2V19.3ZM21.2 15.7H19.3V13.8H21.2V15.7Z"
      fill="currentColor"
    />
  </svg>
</template>
