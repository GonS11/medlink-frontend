import {useI18n} from 'vue-i18n'
import {useForm} from '@shared/composables/useForm'
import {createAuthSchemas, type LoginFormData} from '@entities/auth/model/validation/auth.validation'
import {useRememberMe} from './useRememberMe'
import {UseLoginFormOptions} from "@features/auth/model/types/auth.feature.types.ts";


export function useLoginForm(options: UseLoginFormOptions) {
  const {onSubmit} = options
  const {t} = useI18n()
  const {loginSchema} = createAuthSchemas(t)
  const {rememberMe, loadSavedEmail, saveEmail} = useRememberMe()

  const getInitialValues = (): LoginFormData => ({
    email: loadSavedEmail(),
    password: '',
  })

  const {form, errors, validateForm, handleInput, handleBlur, resetForm} = useForm(
    getInitialValues(),
    loginSchema,
    t
  )

  const handleSubmit = async () => {
    if (validateForm()) {
      saveEmail(form.email)
      await onSubmit({
        email: form.email,
        password: form.password,
      })
    }
  }

  return {
    form,
    errors,
    rememberMe,
    handleSubmit,
    handleInput,
    handleBlur,
    resetForm,
  }
}
