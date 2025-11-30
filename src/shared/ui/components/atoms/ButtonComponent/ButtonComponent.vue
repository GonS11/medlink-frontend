<script setup lang="ts">
import {computed, useSlots} from 'vue'
import {ButtonProps} from "@shared/types/general.types.ts"
import SpinnerIcon from "@shared/ui/icons/SpinnerIcon.vue"

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
  iconPosition: 'left',
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
    'btn--icon-only': props.iconOnly,
    'btn--rounded': props.rounded,
    'btn--loading': props.loading,
  },
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
    <span v-if="loading" class="btn__spinner">
      <SpinnerIcon :label="$t('icon.spinner')"/>
    </span>

    <template v-else>
      <span
        v-if="slots.icon && iconPosition === 'left' && !iconOnly"
        class="btn__icon btn__icon--left"
      >
        <slot name="icon"/>
      </span>

      <span v-if="!iconOnly" class="btn__text">
        <slot/>
      </span>

      <span
        v-if="iconOnly && slots.icon"
        class="btn__icon btn__icon--only"
      >
        <slot name="icon"/>
      </span>

      <span
        v-if="slots.icon && iconPosition === 'right' && !iconOnly"
        class="btn__icon btn__icon--right"
      >
        <slot name="icon"/>
      </span>
    </template>
  </button>
</template>

<style scoped lang="scss" src="./ButtonComponent.scss"></style>
