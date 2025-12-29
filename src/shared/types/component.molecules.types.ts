import {Component} from "vue";

export interface ConfirmDialogProps {
  show?: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'danger' | 'warning' | 'info'
  loading?: boolean
}

export interface DataFieldProps {
  label: string
  value?: string | number | boolean | null
  loading?: boolean
  fallback?: string
}

export interface DetailSectionProps {
  title: string
  variant?: 'default' | 'alert'
}

export interface FileUploadProps {
  modelValue?: File | File[] | null
  label?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  accept?: string
  maxSize?: number // En MB
  maxFiles?: number
  showPreview?: boolean
  variant?: 'button' | 'dropzone'
}

export interface ModalProps {
  show: boolean
  title?: string
  variant?: 'primary' | 'danger' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showFooter?: boolean
  showClose?: boolean
  closeOnBackdrop?: boolean
  loading?: boolean
}

export interface StatCardProps {
  label: string
  value: string | number
  icon: Component
  loading?: boolean
}
