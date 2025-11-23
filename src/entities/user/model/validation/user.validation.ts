import {z} from 'zod';
import {Languages} from '@shared/types/api.types';
import {createCommonValidations, TranslationFunction} from '@shared/validation/common.validation';

export const createUserSchemas = (t: TranslationFunction) => {
  const v = createCommonValidations(t);

  const updateUserSchema = z.object({
    firstName: v.optionalName,
    lastName: v.optionalName,
    secondLastName: v.optionalName,
    phone: v.phone,
    mobilePhone: v.phone,
    preferredLanguage: z.enum(Languages).optional(),
    isActive: z.boolean().optional(),
  });

  const changePasswordSchema = z
    .object({
      currentPassword: z.string().min(1, t('validation.currentPasswordRequired')),
      newPassword: v.password,
      confirmPassword: z.string().min(1, t('validation.confirmPasswordRequired')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('validation.passwordsMustMatch'),
      path: ['confirmPassword'],
    });

  const lockAccountSchema = z.object({
    durationMinutes: z.number().min(1, t('validation.minDuration')).optional(),
    reason: z.string().max(500, t('validation.reasonMax')).optional().or(z.literal('')),
  });

  return {
    updateUserSchema,
    changePasswordSchema,
    lockAccountSchema,
  };
};

export type UpdateUserFormData = z.infer<ReturnType<typeof createUserSchemas>['updateUserSchema']>;
export type ChangePasswordFormData = z.infer<ReturnType<typeof createUserSchemas>['changePasswordSchema']>;
export type LockAccountFormData = z.infer<ReturnType<typeof createUserSchemas>['lockAccountSchema']>;
