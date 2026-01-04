import type {PageResponse} from '@shared/types/api.types'

export interface CarouselProps<T> {
  items: T[]
  loading?: boolean
  pagination?: PageResponse<T> | null
  itemWidth?: string
  gap?: string
  showNavigation?: boolean
  showScrollIndicator?: boolean
  emptyMessage?: string
  itemKey?: keyof T
}

export interface CarouselEmits {
  (e: 'load-more'): void
}

export interface CarouselSlots<T> {
  item: (props: { item: T; index: number }) => any
  'empty-state': () => any
  'loading-item': () => any
}
