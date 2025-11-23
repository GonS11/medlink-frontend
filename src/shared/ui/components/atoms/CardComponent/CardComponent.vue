<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  title?: string
  variant?: 'default' | 'shadow' | 'borderless'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
})

const cardClasses = computed(() => [
  'card',
  `card--${props.variant}`,
])

const bodyClasses = computed(() => [
  'card__body',
  `card__body--padding-${props.padding}`,
])
</script>

<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card__header">
      <slot name="header">
        <h3 class="card__title">{{ title }}</h3>
      </slot>
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
