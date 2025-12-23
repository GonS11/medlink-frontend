<script setup lang="ts">
import PageHeader from '@shared/ui/components/layout/PageHeader/PageHeader.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import {ListPageLayoutProps} from "@shared/types/layout.types.ts";


withDefaults(defineProps<ListPageLayoutProps>(), {
  showCreate: true,
  createLabel: 'common.create',
})

defineEmits<{
  create: []
}>()
</script>

<template>
  <div class="page-layout page-layout--list">
    <PageHeader class="page-layout__header" :title="title" :subtitle="subtitle">
      <template #actions>
        <slot name="header-actions"/>
        <ButtonComponent
          v-if="showCreate"
          variant="primary"
          class="page-layout__action-btn"
          @click="$emit('create')"
        >
          <span class="page-layout__btn-icon">+</span> {{ $t(createLabel) }}
        </ButtonComponent>
      </template>
    </PageHeader>

    <div class="page-layout__content">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss" src="PageLayout.scss"></style>
