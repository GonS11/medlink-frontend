import {z} from 'zod';

export type TranslationFunction = (key: string, params?: Record<string, any>) => string;

export const createCommonValidations = (t: TranslationFunction) => {
  const MIN_PASS_LENGTH = 8;
  const MAX_PHONE_LENGTH = 20;
  const MAX_NAME_LENGTH = 40;

  // Helper for required fields using the parameterized system
  const requiredValidation = (fieldKey: string) =>
    z.string().min(1, t('validation.required', {field: t(fieldKey)}));

  return {
    email: z
      .string()
      .min(1, t('validation.required', {field: t('fields.email')}))
      .email(t('validation.invalid', {field: t('fields.email')})),

    password: z
      .string()
      .min(MIN_PASS_LENGTH, t('validation.minLength', {
        field: t('fields.password'),
        min: MIN_PASS_LENGTH
      }))
      // Using individual requirements from the JSON for better feedback
      .regex(/[a-z]/, t('validation.password.lowercase'))
      .regex(/[A-Z]/, t('validation.password.uppercase'))
      .regex(/\d/, t('validation.password.number')),

    phone: z
      .string()
      .max(MAX_PHONE_LENGTH, t('validation.maxLength', {
        field: t('fields.phone'),
        max: MAX_PHONE_LENGTH
      }))
      .regex(/^\+?[0-9\s\-()]*$/, t('validation.invalid', {field: t('fields.phone')}))
      .optional()
      .or(z.literal('')),

    name: requiredValidation('fields.name')
      .max(MAX_NAME_LENGTH, t('validation.maxLength', {
        field: t('fields.name'),
        max: MAX_NAME_LENGTH
      })),

    optionalName: z
      .string()
      .max(MAX_NAME_LENGTH, t('validation.maxLength', {
        field: t('fields.name'),
        max: MAX_NAME_LENGTH
      }))
      .optional()
      .or(z.literal(''))
  };
};
