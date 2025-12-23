<script setup lang="ts">
import PageHeader from '@shared/ui/components/layout/PageHeader/PageHeader.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import CardComponent from '@shared/ui/components/atoms/CardComponent/CardComponent.vue'
import EditIcon from "@shared/ui/icons/EditIcon.vue"
import DeleteIcon from "@shared/ui/icons/DeleteIcon.vue"
import {DetailPageLayoutProps} from "@shared/types/layout.types.ts"

withDefaults(defineProps<DetailPageLayoutProps>(), {
  loading: false,
  showEdit: false,
  showDelete: false,
})

defineEmits<{
  back: []
  edit: []
  delete: []
}>()
</script>

<template>
  <div class="detail-layout">
    <PageHeader
      class="detail-layout__header"
      :title="title"
      :subtitle="subtitle"
      @back="$emit('back')"
    >
      <template #actions>
        <slot name="header-actions"/>

        <div class="detail-layout__actions">
          <ButtonComponent
            v-if="showEdit"
            variant="secondary"
            :icon="EditIcon"
            :disabled="loading"
            @click="$emit('edit')"
          >
            {{ $t('common.edit') }}
          </ButtonComponent>

          <ButtonComponent
            v-if="showDelete"
            variant="danger"
            :icon="DeleteIcon"
            :disabled="loading"
            @click="$emit('delete')"
          >
            {{ $t('common.delete') }}
          </ButtonComponent>
        </div>
      </template>
    </PageHeader>

    <main class="detail-layout__content">
      <CardComponent variant="shadow" padding="lg" :loading="loading">
        <slot/>
      </CardComponent>
    </main>
  </div>
</template>

<style scoped lang="scss" src="./PageLayout.scss"></style>
