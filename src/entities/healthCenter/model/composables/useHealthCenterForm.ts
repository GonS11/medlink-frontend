import {computed, watch} from 'vue';
import {useForm} from '@shared/composables/useForm';
import {useI18n} from 'vue-i18n';
import {createHealthCenterSchemas} from '@entities/healthCenter/model/validation/healthCenter.validation';
import {UseHealthCenterFormOptions} from "@entities/healthCenter/model/types/health.composables.types.ts";
import {HealthCenterLevel, HealthCenterType} from "@shared/types/enums.types.ts";

export function useHealthCenterForm(options: UseHealthCenterFormOptions) {
  const {mode, healthCenter, onSubmit, onCancel} = options;
  const {t} = useI18n();
  const schemas = createHealthCenterSchemas(t);

  const getInitialValues = () => ({
    name: healthCenter?.name || '',
    type: healthCenter?.type || HealthCenterType.PRIMARY_CARE_CENTER,
    level: healthCenter?.level || HealthCenterLevel.PRIMARY,
    autonomousCommunity: healthCenter?.autonomousCommunity || '',
    address: healthCenter?.address || '',
    city: healthCenter?.city || '',
    province: healthCenter?.province || '',
    postalCode: healthCenter?.postalCode || '',
    phone: healthCenter?.phone || '',
    emergencyPhone: healthCenter?.emergencyPhone || '',
    email: healthCenter?.email || '',
    website: healthCenter?.website || '',
    totalBeds: healthCenter?.totalBeds || 0,
    icuBeds: healthCenter?.icuBeds || 0,
    emergencyBeds: healthCenter?.emergencyBeds || 0,
    hasEmergency: healthCenter?.hasEmergency ?? false,
    hasICU: healthCenter?.hasICU ?? false,
    hasHeliport: healthCenter?.hasHeliport ?? false,
    isTeachingHospital: healthCenter?.isTeachingHospital ?? false,
    isPublic: healthCenter?.isPublic ?? true,
    accreditations: healthCenter?.accreditations || '',
  });

  const currentSchema = computed(() =>
    mode === 'create' ? schemas.createHealthCenterSchema : schemas.updateHealthCenterSchema
  );

  const {form, errors, validateForm, handleInput, handleBlur, resetForm} = useForm(
    getInitialValues(),
    currentSchema.value,
    t
  );

  // Watch simplificado
  watch(() => healthCenter, (newVal) => {
    if (newVal && mode === 'edit') {
      // Usamos el helper de initialValues para consistencia
      const values = getInitialValues();
      // Asignamos llave a llave para mantener reactividad del objeto form original
      Object.keys(values).forEach(key => {
        // @ts-ignore
        form[key] = values[key];
      });
    }
  }, {deep: true});

  const handleSubmit = () => {
    if (validateForm()) {
      // Helper para convertir strings vacíos a undefined
      const clean = (val: any) => (val === '' ? undefined : val);

      const submitData = {
        ...form,
        emergencyPhone: clean(form.emergencyPhone),
        email: clean(form.email),
        website: clean(form.website),
        accreditations: clean(form.accreditations),
        // Aseguramos números
        totalBeds: Number(form.totalBeds) || 0,
        icuBeds: Number(form.icuBeds) || 0,
        emergencyBeds: Number(form.emergencyBeds) || 0,
      };

      onSubmit(submitData);
    }
  };

  return {
    form,
    errors,
    mode,
    handleSubmit,
    handleInput,
    handleBlur,
    handleCancel: onCancel,
    resetForm,
  };
}
