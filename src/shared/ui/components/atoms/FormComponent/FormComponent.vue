<script setup lang="ts">
import {computed} from 'vue'
import {FormProps} from "@shared/types/form.types.ts"

const props = withDefaults(defineProps<FormProps>(), {
  variant: 'elevated',
  maxWidth: 'md',
  centered: true,
})

const emit = defineEmits<{ submit: [] }>()

const formClasses = computed(() => [
  'form',
  `form--variant-${props.variant}`,
  `form--size-${props.maxWidth}`,
  {'form--centered': props.centered},
])

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emit('submit')
}
</script>

<template>
  <div :class="formClasses">
    <div class="form__container">
      <header v-if="title || subtitle || $slots.header" class="form__header">
        <slot name="header">
          <h1 v-if="title" class="form__title">{{ title }}</h1>
          <p v-if="subtitle" class="form__subtitle">{{ subtitle }}</p>
        </slot>
      </header>

      <form class="form__body-container" @submit="handleSubmit">

        <div class="form__body">
          <slot/>
        </div>

        <footer v-if="$slots.footer" class="form__footer">
          <slot name="footer"/>
        </footer>

      </form>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./FormComponent.scss"></style>
