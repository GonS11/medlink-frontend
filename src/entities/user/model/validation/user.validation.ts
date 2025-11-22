import {z} from 'zod'
import {Languages} from '@shared/types/api.types'
import {commonValidations} from '@shared/validation/common.validation'

export const updateUserSchema = z.object({
  firstName: commonValidations.optionalName,
  lastName: commonValidations.optionalName,
  secondLastName: commonValidations.optionalName,
  phone: commonValidations.phone,
  mobilePhone: commonValidations.phone,
  preferredLanguage: z.enum(Languages).optional(),
  isActive: z.boolean().optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: commonValidations.password,
  confirmPassword: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const lockAccountSchema = z.object({
  durationMinutes: z
    .number()
    .min(1, 'Duration must be at least 1 minute')
    .optional(),
  reason: z
    .string()
    .max(500, 'Reason must not exceed 500 characters')
    .optional()
    .or(z.literal('')),
})

export type UpdateUserFormData = z.infer<typeof updateUserSchema>
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>
export type LockAccountFormData = z.infer<typeof lockAccountSchema>
