<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import SearchIcon from "@shared/ui/icons/SearchIcon.vue";
import {DetailPageLayoutProps} from "@shared/types/layout.types.ts";

const props = withDefaults(defineProps<DetailPageLayoutProps>(), {
  loading: false,
  showEdit: false,
  showDelete: false,
  showEmpty: false,
  emptyStateIcon: () => SearchIcon
})

const emit = defineEmits<{
  edit: []
  delete: []
}>()

const {t} = useI18n()
const router = useRouter()

const handleBack = () => router.push(props.backRoute)
const handleEdit = () => emit('edit')
const handleDelete = () => emit('delete')
</script>

<template>
  <div class="detail-page-layout">
    <header class="detail-page-layout__header">
      <div class="detail-page-layout__header-content">
        <button
          class="detail-page-layout__back-button"
          @click="handleBack"
          :aria-label="t('common.back')"
        >
          ← {{ t('common.back') }}
        </button>

        <div class="detail-page-layout__title-group">
          <h1 class="detail-page-layout__title">{{ title }}</h1>
          <p v-if="subtitle" class="detail-page-layout__subtitle">{{ subtitle }}</p>
        </div>
      </div>

      <div v-if="$slots['header-actions'] || showEdit || showDelete" class="detail-page-layout__actions">
        <slot name="header-actions"/>

        <ButtonComponent
          v-if="showEdit"
          variant="outline"
          @click="handleEdit"
        >
          {{ t('common.edit') }}
        </ButtonComponent>

        <ButtonComponent
          v-if="showDelete"
          variant="danger"
          @click="handleDelete"
        >
          {{ t('common.delete') }}
        </ButtonComponent>
      </div>
    </header>

    <div class="detail-page-layout__content">
      <div v-if="loading" class="detail-page-layout__loading">
        <div class="detail-page-layout__spinner"/>
        <p class="detail-page-layout__loading-text">{{ t('common.loading') }}</p>
      </div>

      <div v-else-if="showEmpty" class="detail-page-layout__empty">
        <component
          :is="emptyStateIcon"
          class="detail-page-layout__empty-icon"
          :label="t('icons.notFound')"
        />
        <h3 class="detail-page-layout__empty-title">
          {{ t(`entities.${entityName}.notFound`) }}
        </h3>
        <p class="detail-page-layout__empty-description">
          {{ t(`entities.${entityName}.notFoundDesc`) }}
        </p>
        <ButtonComponent @click="handleBack">
          {{ t('common.goBack') }}
        </ButtonComponent>
      </div>

      <div v-else class="detail-page-layout__main">
        <slot/>
      </div>
    </div>

    <slot name="modals"/>
  </div>
</template>

<style scoped lang="scss" src="./DetailPageWrapper.scss"></style>
