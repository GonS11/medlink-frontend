import {Component} from "vue";

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'accent' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: Component
  iconOnly?: boolean
  iconPosition?: 'left' | 'right'
  rounded?: boolean
}




export interface StatCardProps {
  label: string
  value: string | number
  icon: Component
  loading?: boolean
}


