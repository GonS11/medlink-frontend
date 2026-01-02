import {z} from 'zod';
import {createCommonValidations, TranslationFunction} from '@shared/validation/common.validation';
import {AutonomousCommunityArray, HealthCenterLevelArray, HealthCenterTypeArray} from "@shared/types/enums.types.ts";

export const createHealthCenterSchemas = (t: TranslationFunction) => {
  const v = createCommonValidations(t);

  const postalCode = z
    .string()
    .min(1, t('validation.required', {field: t('fields.postalCode')}))
    .regex(/^\d{5}$/, t('validation.invalidPostalCode'));

  const website = z
    .string()
    .regex(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      t('validation.invalidUrl')
    )
    .optional()
    .or(z.literal(''));

  const beds = z
    .number()
    .int(t('validation.mustBeInteger'))
    .min(0, t('validation.minValue', {field: t('fields.beds'), min: 0}))
    .optional();

  const accreditations = z
    .string()
    .max(1000, t('validation.maxLength', {field: t('fields.accreditations'), max: 1000}))
    .optional()
    .or(z.literal(''));

  const baseHealthCenter = {
    name: z
      .string()
      .min(1, t('validation.required', {field: t('fields.name')}))
      .max(200, t('validation.maxLength', {field: t('fields.name'), max: 200})),
    type: z.enum(HealthCenterTypeArray),
    level: z.enum(HealthCenterLevelArray),
    autonomousCommunity: z.enum(AutonomousCommunityArray),
    address: z
      .string()
      .min(1, t('validation.required', {field: t('fields.address')}))
      .max(300, t('validation.maxLength', {field: t('fields.address'), max: 300})),
    city: z
      .string()
      .min(1, t('validation.required', {field: t('fields.city')}))
      .max(100, t('validation.maxLength', {field: t('fields.city'), max: 100})),
    province: z
      .string()
      .min(1, t('validation.required', {field: t('fields.province')}))
      .max(100, t('validation.maxLength', {field: t('fields.province'), max: 100})),
    postalCode,
    phone: v.phone.refine(val => val && val.length > 0, {
      message: t('validation.required', {field: t('fields.phone')})
    }),
    emergencyPhone: v.phone.optional().or(z.literal('')), // Corrección: emergencyPhone suele ser opcional en inputs si no es required
    email: v.email.optional().or(z.literal('')),
    website,
    totalBeds: beds,
    icuBeds: beds,
    emergencyBeds: beds,
    hasEmergency: z.boolean(),
    hasICU: z.boolean(),
    hasHeliport: z.boolean().optional(),
    isTeachingHospital: z.boolean().optional(),
    isPublic: z.boolean(),
    accreditations,
  };

  const createHealthCenterSchema = z.object(baseHealthCenter)
    .refine(data => {
      if (!data.hasICU) return true;
      return !!(data.icuBeds && data.icuBeds > 0);
    }, {
      message: t('validation.icuBedsRequired'),
      path: ['icuBeds']
    })
    .refine(data => {
      if (!data.hasEmergency) return true;
      return !!(data.emergencyBeds && data.emergencyBeds > 0);
    }, {
      message: t('validation.emergencyBedsRequired'),
      path: ['emergencyBeds']
    })
    .refine(data => {
      // Validación segura de números
      const total = data.totalBeds || 0;
      const icu = data.icuBeds || 0;
      if (total === 0) return true; // Si no hay total, asumimos que no hay validación de tope todavía o es 0
      return icu <= total;
    }, {
      message: t('validation.icuBedsCantExceedTotal'),
      path: ['icuBeds']
    })
    .refine(data => {
      const total = data.totalBeds || 0;
      const emergency = data.emergencyBeds || 0;
      if (total === 0) return true;
      return emergency <= total;
    }, {
      message: t('validation.emergencyBedsCantExceedTotal'),
      path: ['emergencyBeds']
    });

  // Para update hacemos todos opcionales, pero mantenemos validaciones de formato
  const updateHealthCenterSchema = z.object({
    name: baseHealthCenter.name.optional(),
    autonomousCommunity: baseHealthCenter.autonomousCommunity.optional(),
    address: baseHealthCenter.address.optional(),
    city: baseHealthCenter.city.optional(),
    province: baseHealthCenter.province.optional(),
    postalCode: postalCode.optional(),
    phone: v.phone.optional(),
    emergencyPhone: v.phone.optional().or(z.literal('')),
    email: v.email.optional().or(z.literal('')),
    website,
    totalBeds: beds,
    icuBeds: beds,
    emergencyBeds: beds,
    hasEmergency: z.boolean().optional(),
    hasICU: z.boolean().optional(),
    hasHeliport: z.boolean().optional(),
    isTeachingHospital: z.boolean().optional(),
    isPublic: z.boolean().optional(),
    accreditations,
  });
  // Nota: Las validaciones cruzadas (refine) en Update son complejas porque
  // puede que solo envíes un campo. Se suelen omitir o manejar con cuidado en el UI.

  return {
    createHealthCenterSchema,
    updateHealthCenterSchema,
  };
};

export type CreateHealthCenterFormData = z.infer<ReturnType<typeof createHealthCenterSchemas>['createHealthCenterSchema']>;
export type UpdateHealthCenterFormData = z.infer<ReturnType<typeof createHealthCenterSchemas>['updateHealthCenterSchema']>;
