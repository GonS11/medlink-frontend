import {ref, reactive, type Ref} from 'vue'
import {ZodError, ZodObject, ZodType} from 'zod'

interface ZodValidationError extends ZodError {
  errors: Array<{ path: (string | number)[], message: string }>;
}

type ErrorRecord<T> = Partial<Record<keyof T, string | undefined>>;
type FormRecord<T> = Record<keyof T, any>;

const isZodValidationError = (error: unknown): error is ZodValidationError => {
  return error instanceof ZodError
}

export function useForm<
  T extends Record<string, any>
>(
  initialValues: T,
  schema?: ZodType<T>
) {
  const form = reactive<T>({...initialValues})
  const errors = reactive<ErrorRecord<T>>({})
  const loading = ref(false) as Ref<boolean> // Aseguramos el tipo Ref<boolean>

  const pickSchema = (field: keyof T) => {
    return (schema as ZodObject<any>).pick({[field]: true} as any);
  }

  const validateField = (field: keyof T): boolean => {
    if (!schema) return true

    const fieldData = {[field]: (form as FormRecord<T>)[field]};

    try {
      pickSchema(field).parse(fieldData);
      (errors as ErrorRecord<T>)[field] = undefined
      return true
    } catch (error) {
      if (isZodValidationError(error)) {
        (errors as ErrorRecord<T>)[field] = error.errors[0].message
        return false
      }
      (errors as ErrorRecord<T>)[field] = 'An unexpected error occurred'
      return false
    }
  }

  const validateForm = (): boolean => {
    if (!schema) return true

    try {
      (schema as ZodType<T>).parse(form)

      Object.keys(errors).forEach(key => {
        (errors as ErrorRecord<T>)[key as keyof T] = undefined
      })
      return true
    } catch (error) {
      if (isZodValidationError(error)) {
        Object.keys(errors).forEach(key => {
          (errors as ErrorRecord<T>)[key as keyof T] = undefined
        })

        error.errors.forEach(err => {
          if (err.path.length > 0) {
            const field = err.path[0] as keyof T
            (errors as ErrorRecord<T>)[field] = err.message
          }
        })
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
  }

  const setFieldValue = (field: keyof T, value: any) => {
    (form as FormRecord<T>)[field] = value
  }

  const setFieldError = (field: keyof T, error: string) => {
    (errors as ErrorRecord<T>)[field] = error
  }

  return {
    form,
    errors,
    loading,
    validateField,
    validateForm,
    resetForm,
    setFieldValue,
    setFieldError,
  }
}
