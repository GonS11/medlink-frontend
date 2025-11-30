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

  const passwordValidation = z.string()
    .min(8, t('validation.passwordMinLength', {min:8}))
    .regex(/^(?=.*[a-z])/, t('validation.passwordLowercase'))
    .regex(/^(?=.*[A-Z])/, t('validation.passwordUppercase'))
    .regex(/^(?=.*\d)/, t('validation.passwordNumber'));

  const changePasswordSchema = z.object({
    newPassword: passwordValidation,
    confirmNewPassword: z.string().min(1, t('validation.confirmPasswordRequired')),
  })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t('validation.passwordsMustMatch'),
      path: ['confirmNewPassword'], // Asigna el error al campo de confirmación
    });

  const lockAccountSchema = z.object({
    durationMinutes: z.number().min(1, t('validation.minDuration')).optional(),
    reason: z.string().max(500, t('validation.reasonMax')).optional().or(z.literal('')),
  });


  return {
    updateUserSchema,
    lockAccountSchema,
    changePasswordSchema
  };
};

export type UpdateUserFormData = z.infer<ReturnType<typeof createUserSchemas>['updateUserSchema']>;
export type LockAccountFormData = z.infer<ReturnType<typeof createUserSchemas>['lockAccountSchema']>;
export type ChangePasswordFormData = z.infer<ReturnType<typeof createUserSchemas>['changePasswordSchema']>;
