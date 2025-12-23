import type {UserResponse} from "@entities/user/model/types/user.types.ts";

export interface FormattedName {
  main: string
  secondary?: string
  initials: string
  full: string
}

export interface UserAvatarProps {
  user: UserResponse
  size?: 'sm' | 'md' | 'lg'
}


export interface UserDetailViewProps {
  user: UserResponse
  loading?: boolean
}

export interface UserFormProps {
  user?: UserResponse
  loading?: boolean
  mode: 'create' | 'edit'
}

export interface UserStatusBadgeProps {
  user: UserResponse
  size?: 'sm' | 'md' | 'lg'
}


export interface LockFormData {
  durationMinutes?: number
  reason?: string
}
