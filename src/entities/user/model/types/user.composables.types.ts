import type {UserResponse} from "@entities/user/model/types/user.types.ts";
import {ComputedRef} from "vue";

export interface FormattedName {
  main: string
  secondary?: string
  initials: string
  full: string
}

export interface UserFormatters {
  formatFullName: ComputedRef<FormattedName>
  formatRole: ComputedRef<string>
  isActive: ComputedRef<boolean>
  isLocked: ComputedRef<boolean>
  hasSecondLastName: ComputedRef<boolean>
}

export interface UseUserFormOptions {
  mode: 'create' | 'edit'
  user?: UserResponse
  onSubmit: (data: any) => void
  onCancel: () => void
}
