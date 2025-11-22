<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'btn',
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {'btn-full-width': props.fullWidth},
  {'btn-loading': props.loading},
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="spinner"></span>
    <slot v-else/>
  </button>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables.scss';

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-sm;
  font-family: $font-family-base;
  font-weight: $font-weight-medium;
  border: none;
  border-radius: $radius-lg;
  cursor: pointer;
  transition: all $transition-base;
  white-space: nowrap;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }

  &-sm {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-sm;
  }

  &-md {
    padding: $spacing-md $spacing-lg;
    font-size: $font-size-base;
  }

  &-lg {
    padding: $spacing-lg $spacing-xl;
    font-size: $font-size-lg;
  }

  &-primary {
    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
    color: $text-white;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &-secondary {
    background: linear-gradient(135deg, $secondary 0%, $secondary-dark 100%);
    color: $text-white;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }
  }

  &-danger {
    background: linear-gradient(135deg, $error 0%, $accent-dark 100%);
    color: $text-white;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: $shadow-md;
    }
  }

  &-outline {
    background: transparent;
    color: $primary;
    border: 2px solid $primary;

    &:hover:not(:disabled) {
      background: $primary;
      color: $text-white;
    }
  }

  &-ghost {
    background: transparent;
    color: $text-primary;

    &:hover:not(:disabled) {
      background: $bg-tertiary;
    }
  }

  &-full-width {
    width: 100%;
  }

  &-loading {
    pointer-events: none;
  }
}
</style>
