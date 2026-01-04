import {z} from 'zod';
import {createCommonValidations, TranslationFunction} from '@shared/validation/common.validation';
import {LanguageCodeArray, UserRoleArray} from "@shared/types/enums.types.ts";

export const createAuthSchemas = (t: TranslationFunction) => {
  const validation = createCommonValidations(t);

  const loginSchema = z.object({
    email: validation.email,
    password: z.string().min(1, t('validation.required',{field:t('fields.password')})),
  });

  const registerSchema = z.object({
    email: validation.email,
    password: validation.password,
    confirmPassword: z.string().min(1, t('validation.required',{field:t('fields.confirmPassword')})),
    firstName: validation.name,
    lastName: validation.name,
    secondLastName: validation.optionalName,
    phone: validation.phone,
    mobilePhone: validation.phone,
    role: z.enum(UserRoleArray, {
      message: t('validation.required',{field:t('fields.role')}),
    }),
    preferredLanguage: z.enum(LanguageCodeArray).optional(),
  })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.password.match'),
      path: ['confirmPassword'],
    });

  return {loginSchema, registerSchema};
};

export type LoginFormData = z.infer<ReturnType<typeof createAuthSchemas>['loginSchema']>;
export type RegisterFormData = z.infer<ReturnType<typeof createAuthSchemas>['registerSchema']>;
