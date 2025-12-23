import {LoginRequest, RegisterRequest} from "@entities/auth/model/types/auth.types.ts";

export interface UseLoginFormOptions {
  onSubmit: (data: LoginRequest) => void | Promise<void>
}

export interface UseRegisterFormOptions {
  onSubmit: (data: RegisterRequest) => Promise<void>
}

export interface RememberMeProps {
  email: string
  expiry: number
}
