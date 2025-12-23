import {Ref} from "vue";
import type {PageResponse, PaginationParams} from "@shared/types/api.types.ts";

export interface AsyncActionOptions {
  successMessage?: string
  errorMessage?: string
  showSuccessNotification?: boolean
  showErrorNotification?: boolean
  onSuccess?: () => void | Promise<void>
  onError?: (error: any) => void
}


export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'danger' | 'warning'
}


export interface EntityService<T, CreateDto, UpdateDto, R = T> {
  getAll: (params?: PaginationParams) => Promise<PageResponse<T>>
  getById: (id: number) => Promise<T>
  create: (data: CreateDto) => Promise<R>
  update: (id: number, data: UpdateDto) => Promise<T>
  delete: (id: number) => Promise<void>
}

export interface EntityStore<T> {
  items: Ref<T[]>
  pagination: Ref<PageResponse<T> | null>
  setItems: (items: T[]) => void
  setPagination: (pagination: PageResponse<T>) => void
  updateItem?: (item: T) => void
  removeItem?: (id: number) => void
}

export interface ModalOptions {
  title?: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'danger' | 'accent'
  size?: 'sm' | 'md' | 'lg'
}

export interface ModalState<T = any> {
  show: boolean
  data: T | null
  options: ModalOptions
}
