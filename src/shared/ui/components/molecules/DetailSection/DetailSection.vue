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
  <section
    class="detail-section"
    :class="[`detail-section--${variant}`]"
  >
    <div class="detail-section__header">
      <h3 class="detail-section__title">{{ title }}</h3>
    </div>
    <div class="detail-section__content">
      <div class="detail-section__grid">
        <slot/>
      </div>
    </div>
  </section>
</template>


<style scoped lang="scss" src="./DetailSection.scss"></style>
