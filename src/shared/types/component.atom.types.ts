export interface AuthBrandingProps {
  variant?: 'login' | 'register'
}

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'accent'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
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

export interface DataFieldProps {
  label: string
  value?: string | number | boolean | null
  loading?: boolean
  fallback?: string
}

export interface SkeletonProps {
  width?: string
  height?: string
  count?: number
  circle?: boolean
  spacing?: string
}
