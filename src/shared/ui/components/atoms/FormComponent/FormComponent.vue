<script setup lang="ts">
import {computed} from 'vue'
import SpinnerIcon from "@shared/ui/icons/SpinnerIcon.vue"
import {FormProps} from "@shared/types/form.structure.types.ts"

const props = withDefaults(defineProps<FormProps>(), {
  variant: 'elevated',
  maxWidth: 'md',
  centered: false,
  loading: false
})

const emit = defineEmits<{
  submit: [event: Event]
}>()

const formClasses = computed(() => [
  'form',
  `form--variant-${props.variant}`,
  `form--width-${props.maxWidth}`,
  {
    'form--centered': props.centered,
    'form--loading': props.loading
  }
])

const handleSubmit = (event: Event) => {
  if (props.loading) {
    event.preventDefault()
    return
  }
  emit('submit', event)
}
</script>

<template>
  <div :class="formClasses">
    <div class="form__wrapper">
      <div v-if="loading" class="form__loader">
        <SpinnerIcon :label="$t('icons.spinner')" class="form__loader-icon"/>
      </div>

      <form class="form__body" @submit="handleSubmit">
        <div class="form__content">
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
