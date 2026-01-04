import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useForm} from '@shared/composables/useForm'
import {createAuthSchemas, type RegisterFormData} from '@entities/auth/model/validation/auth.validation'
import type {RegisterRequest} from '@entities/auth/model/types/auth.types'
import {UseRegisterFormOptions} from "@features/auth/model/types/auth.feature.types.ts";
import {LanguageCode, UserRoleArray} from "@shared/types/enums.types.ts";

export function useRegisterForm(options: UseRegisterFormOptions) {
  const {onSubmit} = options
  const {t} = useI18n()
  const {registerSchema} = createAuthSchemas(t)

  const roleOptions = computed(() =>
    UserRoleArray.map(role => ({
      value: role,
      label: t(`roles.${role}`)
    }))
  )

  const languageOptions = computed(() =>
    Object.values(LanguageCode).map(lang => ({
      value: lang,
      label: t(`languages.${lang}`)
    }))
  )

  const initialValues: RegisterFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    secondLastName: '',
    phone: '',
    mobilePhone: '',
    role: null as any,
    preferredLanguage: undefined,
  }

  const {form, errors, validateForm, handleInput, handleBlur, validateField} = useForm(
    initialValues,
    registerSchema,
    t
  )

  const handleSubmit = async () => {
    if (validateForm()) {
      const {confirmPassword, ...registerData} = form
      await onSubmit(registerData as unknown as RegisterRequest)
    }
  }

  return {
    form,
    errors,
    roleOptions,
    languageOptions,
    handleSubmit,
    handleInput,
    handleBlur,
    validateField
  }
}
