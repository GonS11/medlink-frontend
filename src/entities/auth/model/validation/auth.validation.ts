import {z} from 'zod';
import {Languages, UserRoleArray} from '@shared/types/api.types';
import {createCommonValidations, TranslationFunction} from '@shared/validation/common.validation';

export const createAuthSchemas = (t: TranslationFunction) => {
  const validation = createCommonValidations(t);

  const loginSchema = z.object({
    email: validation.email,
    password: z.string().min(1, t('validation.passwordRequired')),
  });

  const registerSchema = z.object({
    email: validation.email,
    password: validation.password,
    confirmPassword: z.string().min(1, t('validation.confirmPasswordRequired')),
    firstName: validation.name,
    lastName: validation.name,
    secondLastName: validation.optionalName,
    phone: validation.phone,
    mobilePhone: validation.phone,
    role: z.enum(UserRoleArray, {
      message: t('validation.roleRequired'),
    }),
    preferredLanguage: z.enum(Languages).optional(),
  })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsMustMatch'),
      path: ['confirmPassword'],
    });

  return {loginSchema, registerSchema};
};

export type LoginFormData = z.infer<ReturnType<typeof createAuthSchemas>['loginSchema']>;
export type RegisterFormData = z.infer<ReturnType<typeof createAuthSchemas>['registerSchema']>;
