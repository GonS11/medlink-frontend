<script setup lang="ts">
import {computed, useSlots} from 'vue'
import SpinnerIcon from "@shared/ui/icons/SpinnerIcon.vue"
import {CardProps} from "@shared/types/component.atoms.types.ts"

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false,
  clickable: false,
  loading: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const slots = useSlots()

const cardClasses = computed(() => [
  'card',
  `card--${props.variant}`,
  {
    'card--hoverable': props.hoverable,
    'card--clickable': props.clickable,
    'card--loading': props.loading,
    'card--has-header': hasHeader.value,
    'card--has-footer': !!slots.footer
  },
])

const bodyClasses = computed(() => [
  'card__body',
  `card__body--padding-${props.padding}`,
])

const hasHeader = computed(() => {
  return !!(props.title || props.subtitle || slots.header || slots.actions)
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <article
    :class="cardClasses"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleClick"
  >
    <div v-if="loading" class="card__loader">
      <SpinnerIcon :label="$t('icons.spinner')" class="card__loader-icon"/>
    </div>

    <header v-if="hasHeader" class="card__header">
      <div class="card__header-content">
        <slot name="header">
          <h3 v-if="title" class="card__title">{{ title }}</h3>
          <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
        </slot>
      </div>

      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions"/>
      </div>
    </header>

    <div :class="bodyClasses">
      <slot/>
    </div>

    <footer v-if="$slots.footer" class="card__footer">
      <slot name="footer"/>
    </footer>
  </article>
</template>

<style scoped lang="scss" src="./CardComponent.scss"></style>
