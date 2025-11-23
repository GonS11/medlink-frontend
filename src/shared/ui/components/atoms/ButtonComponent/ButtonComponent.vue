<script setup lang="ts">
import {computed, useSlots} from 'vue'
import {ButtonProps} from "@shared/types/general.types.ts";
import SpinnerIcon from "@shared/ui/icons/SpinnerIcon.vue";

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
  iconPosition: 'left',
  ripple: true,
  rounded: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const slots = useSlots()

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--full-width': props.fullWidth,
    'btn--loading': props.loading,
    'btn--icon-only': props.iconOnly,
    'btn--rounded': props.rounded,
    'btn--icon-right': props.iconPosition === 'right' && slots.icon,
  },
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)

    // Ripple effect
    if (props.ripple) {
      createRipple(event)
    }
  }
}

const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement
  // Limpia cualquier efecto de onda existente
  button.querySelectorAll('.ripple').forEach(r => r.remove())

  const ripple = document.createElement('span')
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.classList.add('ripple')

  button.appendChild(ripple)

  setTimeout(() => {
    ripple.remove()
  }, 600)
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="btn__spinner">
      <SpinnerIcon :label="$t('icon.spinner')"/>
    </span>

    <template v-else>
      <span v-if="slots.icon && iconPosition === 'left'" class="btn__icon btn__icon--left">
        <slot name="icon"/>
      </span>

      <span v-if="!iconOnly && slots.default" class="btn__content">
        <slot/>
      </span>

      <span v-if="iconOnly && slots.icon" class="btn__icon btn__icon--only">
        <slot name="icon"/>
      </span>

      <span v-if="slots.icon && iconPosition === 'right' && !iconOnly" class="btn__icon btn__icon--right">
        <slot name="icon"/>
      </span>
    </template>
  </button>
</template>

<style scoped lang="scss" src="./ButtonComponent.scss"></style>
