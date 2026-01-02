import {ref, reactive, type Ref} from 'vue'
import {ZodError, ZodObject, ZodType} from 'zod'
import {ErrorRecord, FormRecord, ZodValidationError} from "@shared/types/form.types.ts"

const isZodValidationError = (error: unknown): error is ZodValidationError => {
  return error instanceof ZodError
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  schema?: ZodType<any>,
  t?: (key: string) => string
) {
  const form = reactive<T>({...initialValues})
  const errors = reactive<ErrorRecord<T>>({})
  const touched = reactive<Record<string, boolean>>({})
  const loading = ref(false) as Ref<boolean>

  const pickSchema = (field: keyof T) => {
    return (schema as ZodObject<any>).partial().pick({[field]: true} as any)
  }

  const validateField = (field: keyof T, shouldTouch = false): boolean => {
    if (!schema) {
      return true
    }

    const fieldKey = String(field)

    if (shouldTouch) {
      touched[fieldKey] = true
    }

    const fieldValue = (form as FormRecord<T>)[field]
    const isTouched = touched[fieldKey] === true
    const hasError = !!(errors as ErrorRecord<T>)[field]
    const hasValue = fieldValue !== '' &&
      fieldValue !== null &&
      fieldValue !== undefined &&
      (Array.isArray(fieldValue) ? fieldValue.length > 0 : true)

    if (!isTouched && !hasValue && !hasError) {
      return true
    }

    const fieldData = {[field]: fieldValue}

    try {
      pickSchema(field).parse(fieldData);
      (errors as ErrorRecord<T>)[field] = undefined
      return true
    } catch (error) {
      if (!isTouched) {
        return false
      }

      if (isZodValidationError(error)) {
        if (error.errors && error.errors.length > 0) {
          const fieldError = error.errors.find(err => err.path[0] === field) || error.errors[0];
          (errors as ErrorRecord<T>)[field] = fieldError.message
          return false
        }
        (errors as ErrorRecord<T>)[field] = t?.('validation.validationFailed')
        return false
      }
      (errors as ErrorRecord<T>)[field] = t?.('validation.unexpectedError')
      return false
    }
  }

  const validateForm = (): boolean => {
    if (!schema) {
      return true
    }

    Object.keys(form).forEach(key => {
      touched[key] = true
    })

    Object.keys(errors).forEach(key => {
      (errors as ErrorRecord<T>)[key as keyof T] = undefined
    })

    try {
      (schema as ZodType<any>).parse(form)
      return true
    } catch (error) {
      if (isZodValidationError(error)) {
        if (error.errors && Array.isArray(error.errors)) {
          error.errors.forEach(err => {
            if (err.path && err.path.length > 0) {
              const field = err.path[0] as keyof T
              (errors as ErrorRecord<T>)[field] = err.message
            }
          })
        }
        return false
      }

      return false
    }
  }

  const resetForm = () => {
    Object.assign(form, initialValues)
    Object.keys(errors).forEach(key => {
      (errors as ErrorRecord<T>)[key as keyof T] = undefined
    })
    Object.keys(touched).forEach(key => {
      touched[key] = false
    })
  }

  const handleBlur = (field: keyof T) => {
    validateField(field, true)
  }

  const handleInput = (field: keyof T, value: any) => {
    (form as FormRecord<T>)[field] = value

    if (value && (errors as ErrorRecord<T>)[field]) {
      (errors as ErrorRecord<T>)[field] = undefined
    }

    const fieldKey = String(field)
    if (touched[fieldKey] && (errors as ErrorRecord<T>)[field]) {
      validateField(field)
    }
  }

  const isFieldValid = (field: keyof T): boolean => {
    if ((errors as ErrorRecord<T>)[field]) {
      return false
    }
    return validateField(field)
  }

  const setFieldValue = (field: keyof T, value: any) => {
    handleInput(field, value)
  }

  const setFieldError = (field: keyof T, error: string) => {
    (errors as ErrorRecord<T>)[field] = error
  }

  const clearFieldError = (field: keyof T) => {
    (errors as ErrorRecord<T>)[field] = undefined
  }

  return {
    form,
    errors,
    touched,
    loading,
    validateField,
    validateForm,
    isFieldValid,
    resetForm,
    handleBlur,
    handleInput,
    setFieldValue,
    setFieldError,
    clearFieldError,
  }
}
