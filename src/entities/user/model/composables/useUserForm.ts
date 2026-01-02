import {computed, watch} from 'vue'
import {useForm} from '@shared/composables/useForm'
import {useI18n} from 'vue-i18n'
import {createUserSchemas} from '@entities/user/model/validation/user.validation'
import type {UseUserFormOptions} from '@entities/user/model/types/user.composables.types'
import {LanguageCode} from "@shared/types/enums.types.ts";

export function useUserForm(options: UseUserFormOptions) {
  const {mode, user, onSubmit, onCancel} = options
  const {t} = useI18n()
  const schemas = createUserSchemas(t)

  const getInitialValues = () => ({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    secondLastName: user?.secondLastName || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'PATIENT',
    phone: user?.phone || '',
    mobilePhone: user?.mobilePhone || '',
    preferredLanguage: user?.preferredLanguage || LanguageCode.ES,
    isActive: user?.isActive ?? true,
  })

  const currentSchema = computed(() =>
    mode === 'create' ? schemas.createUserSchema : schemas.updateUserSchema
  )

  const {form, errors, validateForm, handleInput, handleBlur, resetForm} = useForm(
    getInitialValues(),
    currentSchema.value,
    t
  )

  // Watch para actualizar cuando cambia el user en modo edit
  watch(() => user, (newUser) => {
    if (newUser && mode === 'edit') {
      Object.assign(form, {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        secondLastName: newUser.secondLastName || '',
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone || '',
        mobilePhone: newUser.mobilePhone || '',
        preferredLanguage: newUser.preferredLanguage || LanguageCode.ES,
        isActive: newUser.isActive,
      })
    }
  }, {deep: true})

  const handleSubmit = () => {
    if (validateForm()) {
      const submitData = mode === 'edit'
        ? {
          firstName: form.firstName,
          lastName: form.lastName,
          secondLastName: form.secondLastName,
          phone: form.phone,
          mobilePhone: form.mobilePhone,
          preferredLanguage: form.preferredLanguage,
          isActive: form.isActive,
        }
        : {...form}

      onSubmit(submitData)
    }
  }

  return {
    form,
    errors,
    mode,
    handleSubmit,
    handleInput,
    handleBlur,
    handleCancel: onCancel,
    resetForm,
  }
}
