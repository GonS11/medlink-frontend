<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import DetailPageLayout from '@shared/ui/components/layout/PageLayout/DetailPageLayout.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import SearchIcon from "@shared/ui/icons/SearchIcon.vue";
import {EntityDetailPageWrapperProps} from "@shared/types/layout.types.ts";


withDefaults(defineProps<EntityDetailPageWrapperProps>(), {
  loading: false,
  showEdit: false,
  showDelete: false,
  emptyStateIcon: SearchIcon,
  showEmpty: false
})

const emit = defineEmits<{
  edit: []
  delete: []
}>()

const {t} = useI18n()
const router = useRouter()
</script>

<template>
  <DetailPageLayout
    :title="title"
    :subtitle="subtitle"
    :loading="loading"
    :show-edit="showEdit"
    :show-delete="showDelete"
    @back="router.push(backRoute)"
    @edit="emit('edit')"
    @delete="emit('delete')"
  >
    <template #actions>
      <slot name="header-actions"/>
    </template>

    <slot v-if="!showEmpty"/>

    <div v-else class="entity-detail-page__empty-state">
      <div class="entity-detail-page__icon">{{ emptyStateIcon }}</div>
      <h3 class="entity-detail-page__title">
        {{ t(`entities.${entityName}.notFound`) }}
      </h3>
      <p class="entity-detail-page__description">
        {{ t(`entities.${entityName}.notFoundDesc`) }}
      </p>
      <ButtonComponent @click="router.push(backRoute)">
        {{ t('common.goBack') }}
      </ButtonComponent>
    </div>

    <template #modals>
      <slot name="modals"/>
    </template>
  </DetailPageLayout>
</template>

<style scoped lang="scss" src="./EntityDetailPageWrapper.scss"></style>
