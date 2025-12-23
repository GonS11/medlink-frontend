<script setup lang="ts">
import SkeletonLoader from '@shared/ui/components/atoms/SkeletonLoader/SkeletonLoader.vue'

interface Props {
  label: string
  value?: string | number | boolean | null
  loading?: boolean
  fallback?: string // Qué mostrar si value es null/undefined (por defecto '-')
}

withDefaults(defineProps<Props>(), {
  loading: false,
  fallback: '-',
  value: undefined
})
</script>

<template>
  <div class="data-field">
    <dt class="data-field__label">{{ label }}</dt>

    <dd class="data-field__value">
      <SkeletonLoader
        v-if="loading"
        width="120px"
        height="1.25em"
      />

      <slot v-else-if="$slots.default"/>

      <template v-else>
        {{ (value !== null && value !== undefined && value !== '') ? value : fallback }}
      </template>
    </dd>
  </div>
</template>

<style scoped lang="scss" src="./DataFieldComponent.scss"></style>
