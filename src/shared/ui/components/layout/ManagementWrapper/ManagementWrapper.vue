<script setup lang="ts">
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import {ManagementPageLayoutProps} from "@shared/types/layout.types.ts";

withDefaults(defineProps<ManagementPageLayoutProps>(), {
  showCreateButton: true,
  showHeaderActions: false,
  createButtonText: 'Create'
})

const emit = defineEmits<{
  create: []
}>()

const handleCreate = () => emit('create')
</script>

<template>
  <div class="management-page-layout">
    <!-- Header -->
    <header class="management-page-layout__header">
      <div class="management-page-layout__header-content">
        <h1 class="management-page-layout__title">{{ title }}</h1>
        <p v-if="subtitle" class="management-page-layout__subtitle">{{ subtitle }}</p>
      </div>

      <div
        v-if="showCreateButton || showHeaderActions"
        class="management-page-layout__actions"
      >
        <slot name="header-actions"/>

        <ButtonComponent
          v-if="showCreateButton"
          variant="primary"
          @click="handleCreate"
        >
          {{ createButtonText }}
        </ButtonComponent>
      </div>
    </header>

    <section class="management-page-layout__content">
      <slot name="table"/>
      <slot/>
    </section>

    <slot name="modals"/>
  </div>
</template>

<style scoped lang="scss" src="./ManagementWrapper.scss"></style>
