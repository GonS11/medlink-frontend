<script setup lang="ts">
import {computed} from 'vue'
import {FormProps} from "@shared/types/form.types.ts"

const props = withDefaults(defineProps<FormProps>(), {
  variant: 'elevated',
  maxWidth: 'md',
  centered: true,
})

const emit = defineEmits<{
  submit: []
}>()

const formClasses = computed(() => [
  'form',
  `form--${props.variant}`,
  `form--${props.maxWidth}`,
  {
    'form--centered': props.centered,
  },
])

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emit('submit')
}
</script>

<template>
  <div :class="formClasses">
    <div class="form__container">
      <div v-if="title || subtitle || $slots.header" class="form__header">
        <slot name="header">
          <h1 v-if="title" class="form__title">{{ title }}</h1>
          <p v-if="subtitle" class="form__subtitle">{{ subtitle }}</p>
        </slot>
      </div>

      <form class="form__body" @submit="handleSubmit">
        <slot/>
      </form>

      <div v-if="$slots.footer" class="form__footer">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./FormComponent.scss"></style>
