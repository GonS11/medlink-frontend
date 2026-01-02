import {Component} from "vue";

export interface AuthBrandingProps {
  variant?: 'login' | 'register'
}

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'accent'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: Component
}

export type ButtonVariant =
  'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'accent'
  | 'ghost'
  | 'outline'

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: Component
  iconOnly?: boolean
  iconPosition?: 'left' | 'right'
  rounded?: boolean
}

export interface CardProps {
  title?: string
  subtitle?: string
  variant?: 'default' | 'shadow' | 'borderless' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hoverable?: boolean
  clickable?: boolean
  loading?: boolean
}

export interface CheckProps {
  modelValue?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  error?: boolean
}


export interface SkeletonProps {
  width?: string
  height?: string
  count?: number
  circle?: boolean
  spacing?: string
}
