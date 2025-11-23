import {ZodSchema} from "zod";

export interface UseFormFieldOptions<T> {
  initialValue: T
  validator?: ZodSchema<T>
  validateOn?: 'blur' | 'change' | 'both' | 'manual'
  debounceMs?: number
  required?: boolean
}

export interface FormFieldsetProps {
  legend?: string
  description?: string
  variant?: 'default' | 'bordered' | 'filled'
}

export interface FormRowProps {
  columns?: number | 'auto'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  prefixIcon?: string
  suffixIcon?: string
  prefix?: string
  suffix?: string
  clearable?: boolean
  showPasswordToggle?: boolean
  min?: number
  max?: number
  step?: number
  maxLength?: number
}

interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface SelectProps {
  modelValue?: string | number | null
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  options: SelectOption[]
}

export interface TextAreaProps {
  modelValue?: string
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  showCounter?: boolean
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

export interface CheckboxProps {
  modelValue?: boolean
  label?: string
  description?: string
  error?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export interface RadioOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  modelValue?: string | number | null
  label?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  options: RadioOption[]
  direction?: 'vertical' | 'horizontal'
  size?: 'sm' | 'md' | 'lg'
}

export interface SwitchProps {
  modelValue?: boolean
  label?: string
  description?: string
  error?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  labelPosition?: 'left' | 'right'
}
