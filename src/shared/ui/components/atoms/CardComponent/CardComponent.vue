<script setup lang="ts">
import {computed} from 'vue'
import SpinnerIcon from "@shared/ui/icons/SpinnerIcon.vue";
import {CardProps} from "@shared/types/general.types.ts";

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false,
  clickable: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardClasses = computed(() => [
  'card',
  `card--${props.variant}`,
  {
    'card--hoverable': props.hoverable,
    'card--clickable': props.clickable,
    'card--loading': props.loading,
  },
])

const bodyClasses = computed(() => [
  'card__body',
  `card__body--padding-${props.padding}`,
])

const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <div
    :class="cardClasses"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    @click="handleClick"
  >
    <div v-if="loading" class="card__loading">
      <SpinnerIcon :label="$t('icon.spinner')"/>
    </div>

    <div v-if="$slots.header || title || subtitle" class="card__header">
      <slot name="header">
        <div class="card__header-content">
          <h3 v-if="title" class="card__title">{{ title }}</h3>
          <p v-if="subtitle" class="card__subtitle">{{ subtitle }}</p>
        </div>
      </slot>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions"/>
      </div>
    </div>

    <div :class="bodyClasses">
      <slot/>
    </div>

    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./CardComponent.scss"></style>
