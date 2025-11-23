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
