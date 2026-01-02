import {z} from 'zod';
import {createCommonValidations, TranslationFunction} from '@shared/validation/common.validation';
import {LanguageCodeArray, UserRoleArray} from "@shared/types/enums.types.ts";

export const createUserSchemas = (t: TranslationFunction) => {
  const v = createCommonValidations(t);

  const baseProfile = {
    firstName: v.name,
    lastName: v.name,
    secondLastName: v.optionalName,
    phone: v.phone.optional().or(z.literal('')),
    mobilePhone: v.phone.optional().or(z.literal('')),
    preferredLanguage: z.enum(LanguageCodeArray).optional(),
  };

  const createUserSchema = z.object({
    ...baseProfile,
    email: v.email,
    password: v.password,
    role: z.enum(UserRoleArray),
  });

  const updateUserSchema = z.object({
    ...baseProfile,
    isActive: z.boolean().optional(),
  });

  const passwordValidation = z.string()
    .min(8, t('validation.minLength', {field: t('fields.password'), min: 8}))
    .regex(/^(?=.*[a-z])/, t('validation.password.lowercase'))
    .regex(/^(?=.*[A-Z])/, t('validation.password.uppercase'))
    .regex(/^(?=.*\d)/, t('validation.password.number'));

  const changePasswordSchema = z.object({
    newPassword: passwordValidation,
    confirmNewPassword: z.string().min(1, t('validation.required', {field: t('fields.confirmPassword')})),
  })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t('validation.password.match'),
      path: ['confirmNewPassword'], // Asigna el error al campo de confirmación
    });

  const lockAccountSchema = z.object({
    durationMinutes: z.number().min(1, t('validation.minDuration')).optional(),
    reason: z.string().max(500, t('validation.reasonMax')).optional().or(z.literal('')),
  });


  return {
    createUserSchema,
    updateUserSchema,
    lockAccountSchema,
    changePasswordSchema
  };
};

export type CreateUserFormData = z.infer<ReturnType<typeof createUserSchemas>['createUserSchema']>;
export type UpdateUserFormData = z.infer<ReturnType<typeof createUserSchemas>['updateUserSchema']>;
export type LockAccountFormData = z.infer<ReturnType<typeof createUserSchemas>['lockAccountSchema']>;
export type ChangePasswordFormData = z.infer<ReturnType<typeof createUserSchemas>['changePasswordSchema']>;
