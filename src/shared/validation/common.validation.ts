import {z} from 'zod';

type TranslationFunction = (key: string, params?: Record<string, any>) => string;

export const createCommonValidations = (t: TranslationFunction) => {
  const requiredString = (message: string) => z.string().min(1, message);
  const maxString = (max: number, message: string) => z.string().max(max, message).or(z.literal(''));

  const MIN_PASS_LENGTH = 8;
  const MAX_PHONE_LENGTH = 20;
  const MAX_NAME_LENGTH = 40;

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

    name: requiredString(t('validation.firstNameRequired'))
      .max(MAX_NAME_LENGTH, t('validation.nameMaxLength', {max: MAX_NAME_LENGTH})),

    optionalName: maxString(MAX_NAME_LENGTH, t('validation.nameMaxLength', {max: MAX_NAME_LENGTH}))
  };
};
