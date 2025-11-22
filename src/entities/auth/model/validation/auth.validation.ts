import {z} from 'zod'
import {Languages, UserRoleArray} from '@shared/types/api.types'
import {commonValidations} from '@shared/validation/common.validation'

export const loginSchema = z.object({
  email: commonValidations.email,
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  email: commonValidations.email,
  password: commonValidations.password,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  firstName: commonValidations.name,
  lastName: commonValidations.name,
  secondLastName: commonValidations.optionalName,
  phone: commonValidations.phone,
  mobilePhone: commonValidations.phone,
  role: z.enum(UserRoleArray),
  preferredLanguage: z.enum(Languages).optional(),

}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
