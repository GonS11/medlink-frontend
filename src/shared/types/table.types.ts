import {PageResponse} from "@shared/types/api.types.ts";

export type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends Record<string, any>
    ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
    : `${K}`
}[keyof T & string]

export interface Column<T> {
  key: keyof T | NestedKeyOf<T> | string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (row: T) => string | number | boolean
}

export interface SortConfig {
  key: string
  order: 'asc' | 'desc'
}

export interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  pagination?: PageResponse<T> | null
  loading?: boolean
  emptyMessage?: string
  rowKey?: keyof T
  selectable?: boolean
  showActions?: boolean
  rowClickable?: boolean
  striped?: boolean
  hover?: boolean
}

export interface TableColumn {
  key: string
  label: string
  width?: string
  sortable?: boolean
}
