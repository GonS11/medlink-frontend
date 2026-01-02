<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Details icon'
})
</script>

<template>
  <svg
    :aria-label="label"
    class="details-icon"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="M8 5.5C8.55228 5.5 9 5.05228 9 4.5C9 3.94772 8.55228 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5C7 5.05228 7.44772 5.5 8 5.5Z"
      fill="currentColor"
    />
    <line
      x1="8"
      y1="7"
      x2="8"
      y2="12"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
