<script setup lang="ts">
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import {EntityManagementWrapperProps} from "@shared/types/layout.types.ts";


withDefaults(defineProps<EntityManagementWrapperProps>(), {
  showCreateButton: true,
  showHeaderActions: false
})

const emit = defineEmits<{
  create: []
}>()
</script>

<template>
  <div class="entity-management">
    <header class="entity-management__header">
      <div class="entity-management__header-content">
        <h1 class="entity-management__title">{{ title }}</h1>
        <p class="entity-management__subtitle">{{ subtitle }}</p>
      </div>

      <div v-if="showCreateButton || showHeaderActions" class="entity-management__header-actions">
        <slot name="header-actions"/>

        <ButtonComponent
          v-if="showCreateButton"
          variant="primary"
          @click="emit('create')"
        >
          {{ createButtonText }}
        </ButtonComponent>
      </div>
    </header>

    <section class="entity-management__table-container">
      <slot name="table"/>
    </section>

    <!-- Modales -->
    <slot name="modals"/>
  </div>
</template>

<style scoped lang="scss" src="./EntityManagementWrapper.scss"></style>
