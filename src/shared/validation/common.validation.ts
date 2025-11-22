import {z} from 'zod'

const requiredString = (message: string) => z.string().min(1, message)
const maxString = (max: number, message: string) => z.string().max(max, message).or(z.literal(''))

export const commonValidations = {
  email: z.string().min(1, 'Email is required').email('Email must be valid'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),

  phone: z
    .string()
    .max(20, 'Phone must not exceed 20 characters')
    .regex(/^\+?[0-9\s\-()]*$/, 'Phone must be a valid phone number')
    .optional()
    .or(z.literal('')),

  name: requiredString('First name is required')
    .max(255, 'Must not exceed 255 characters'),

  optionalName: maxString(255, 'Must not exceed 255 characters')
}
