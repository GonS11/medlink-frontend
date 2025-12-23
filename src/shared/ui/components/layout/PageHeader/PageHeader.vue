<script setup lang="ts">
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import {PageHeaderProps} from "@shared/types/layout.types.ts";
import LeftArrowIcon from "@shared/ui/icons/LeftArrowIcon.vue";

withDefaults(defineProps<PageHeaderProps>(), {
  showBack: false,
})

defineEmits<{
  back: []
}>()
</script>

<template>
  <header class="page-header">
    <div class="page-header__left">
      <ButtonComponent
        v-if="showBack"
        variant="ghost"
        size="sm"
        @click="$emit('back')"
        class="page-header__back-btn"
      >
        <LeftArrowIcon :label="$t('icons.back')"/>
        {{ $t('common.back') }}
      </ButtonComponent>

      <div class="page-header__content">
        <h1 class="page-header__title">{{ title }}</h1>
        <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
      </div>
    </div>

    <div v-if="$slots.actions" class="page-header__actions">
      <slot name="actions"/>
    </div>
  </header>
</template>

<style scoped lang="scss" src="./PageHeader.scss"></style>
