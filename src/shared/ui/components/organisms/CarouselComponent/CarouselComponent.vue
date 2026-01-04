<script setup lang="ts" generic="T extends Record<string, any>">
import {ref, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import SkeletonLoader from '@shared/ui/components/atoms/SkeletonLoader/SkeletonLoader.vue'
import ArrowLeftIcon from '@shared/ui/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@shared/ui/icons/ArrowRightIcon.vue'
import {CarouselEmits, CarouselProps} from "@shared/types/component.organisms.types.ts";

const {t} = useI18n()

const props = withDefaults(defineProps<CarouselProps<T>>(), {
  loading: false,
  pagination: null,
  itemWidth: '320px',
  gap: 'var(--spacing-lg)',
  showNavigation: true,
  showScrollIndicator: true,
  emptyMessage: '',
  itemKey: 'id' as any,
})

const emit = defineEmits<CarouselEmits>()

const carouselRef = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)

const activeItemKey = computed(() => props.itemKey as keyof T)

const canScrollLeft = computed(() => scrollPosition.value > 0)

const canScrollRight = computed(() => {
  if (!carouselRef.value) return false
  const container = carouselRef.value
  return scrollPosition.value < (container.scrollWidth - container.clientWidth - 10)
})

const hasMorePages = computed(() => {
  return props.pagination && !props.pagination.last
})

const scroll = (direction: 'left' | 'right') => {
  if (!carouselRef.value) return

  const container = carouselRef.value
  // Usar el itemWidth + gap para calcular el scroll
  const itemWidthNum = parseInt(props.itemWidth)
  const scrollAmount = direction === 'left' ? -itemWidthNum : itemWidthNum

  container.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  })
}

const updateScrollPosition = () => {
  if (carouselRef.value) {
    scrollPosition.value = carouselRef.value.scrollLeft
  }
}

const handleLoadMore = () => {
  emit('load-more')
}

// Number of skeleton items to show
const skeletonCount = computed(() => {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const itemWidthNum = parseInt(props.itemWidth)
  return Math.ceil(viewportWidth / itemWidthNum) || 4
})
</script>

<template>
  <div class="carousel">
    <!-- Navigation Controls -->
    <div v-if="showNavigation && !loading" class="carousel__controls">
      <ButtonComponent
        variant="ghost"
        size="md"
        :disabled="!canScrollLeft"
        :icon="ArrowLeftIcon"
        :aria-label="t('common.previous')"
        class="carousel__nav-btn"
        @click="scroll('left')"
      />
      <ButtonComponent
        variant="ghost"
        size="md"
        :disabled="!canScrollRight"
        :icon="ArrowRightIcon"
        :aria-label="t('common.next')"
        class="carousel__nav-btn"
        @click="scroll('right')"
      />
    </div>

    <!-- Carousel Container -->
    <div
      ref="carouselRef"
      class="carousel__container"
      @scroll="updateScrollPosition"
    >
      <!-- Loading State -->
      <template v-if="loading">
        <div
          v-for="i in skeletonCount"
          :key="`skeleton-${i}`"
          class="carousel__item"
          :style="{ width: itemWidth, flexShrink: 0 }"
        >
          <slot name="loading-item">
            <div class="carousel__skeleton">
              <SkeletonLoader height="280px"/>
            </div>
          </slot>
        </div>
      </template>

      <!-- Empty State -->
      <div
        v-else-if="!items.length"
        class="carousel__empty"
      >
        <slot name="empty-state">
          <div class="carousel__empty-content">
            <p class="carousel__empty-message">
              {{ emptyMessage || t('common.noData') }}
            </p>
          </div>
        </slot>
      </div>

      <!-- Items -->
      <template v-else>
        <div
          v-for="(item, index) in items"
          :key="String(item[activeItemKey])"
          class="carousel__item"
          :style="{ width: itemWidth, flexShrink: 0 }"
        >
          <slot name="item" :item="item" :index="index">
            <div class="carousel__default-item">
              {{ item }}
            </div>
          </slot>
        </div>
      </template>
    </div>

    <!-- Load More Button -->
    <div
      v-if="hasMorePages && !loading"
      class="carousel__load-more"
    >
      <ButtonComponent
        variant="outline"
        size="md"
        @click="handleLoadMore"
      >
        {{ t('common.loadMore') }}
      </ButtonComponent>
    </div>

    <!-- Scroll Indicator -->
    <div
      v-if="showScrollIndicator && !loading && items.length > 3"
      class="carousel__indicator"
    >
      <span class="carousel__indicator-text">
        {{ t('common.scrollForMore') }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./CarouselComponent.scss"></style>
