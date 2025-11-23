export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'accent' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  iconPosition?: 'left' | 'right'
  ripple?: boolean
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
