<script setup lang="ts">
export interface DetailSectionProps {
  title: string
  variant?: 'default' | 'alert'
}

withDefaults(defineProps<DetailSectionProps>(), {
  variant: 'default'
})
</script>

<template>
  <section :class="['detail-section', `detail-section--${variant}`]">
    <header class="detail-section__header">
      <h3 class="detail-section__title">{{ title }}</h3>
    </header>

    <div class="detail-section__body">
      <slot/>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./DetailSection.scss"></style>
