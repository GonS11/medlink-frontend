import {z} from 'zod';

export type TranslationFunction = (key: string, params?: Record<string, any>) => string;

export const createCommonValidations = (t: TranslationFunction) => {
  const MIN_PASS_LENGTH = 8;
  const MAX_PHONE_LENGTH = 20;
  const MAX_NAME_LENGTH = 40;

  const requiredString = (key: string) =>
    z.string().min(1, t(key));

  const optionalString = (max: number, key: string) =>
    z.string()
      .max(max, t(key, {max}))
      .optional()
      .or(z.literal(''));

  return {
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .email(t('validation.emailInvalid')),

    password: z
      .string()
      .min(MIN_PASS_LENGTH, t('validation.passwordMinLength', {min: MIN_PASS_LENGTH}))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
        t('validation.passwordRequirements')
      ),

    phone: z
      .string()
      .max(MAX_PHONE_LENGTH, t('validation.phoneMaxLength', {max: MAX_PHONE_LENGTH}))
      .regex(/^\+?[0-9\s\-()]*$/, t('validation.phoneInvalid'))
      .optional()
      .or(z.literal('')),

    name: requiredString('validation.firstNameRequired').max(
      MAX_NAME_LENGTH,
      t('validation.nameMaxLength', {max: MAX_NAME_LENGTH})
    ),

    optionalName: optionalString(MAX_NAME_LENGTH, 'validation.nameMaxLength')
  };
};
