import {ref, reactive} from 'vue'
import {ZodError, ZodObject, ZodType} from 'zod'

// Interfaz para el error (asegura el acceso a 'errors' y sus propiedades)
interface ZodValidationError extends ZodError {
  errors: Array<{ path: (string | number)[], message: string }>;
}

// Tipos de utilidad
type ErrorRecord<T> = Partial<Record<keyof T, string | undefined>>;
type FormRecord<T> = Record<keyof T, any>; // Para indexación segura del formulario

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
  const loading = ref(false)

  // Función auxiliar para obtener el esquema de un solo campo
  const pickSchema = (field: keyof T) => {
    // Asumimos que si se pasó un esquema, es un ZodObject que soporta .pick()
    return (schema as ZodObject<any>).pick({[field]: true} as any);
  }

  const validateField = (field: keyof T): boolean => {
    if (!schema) return true

    // 🛑 Importante: Debemos crear el objeto que Zod espera para el esquema 'picked'
    const fieldData = {[field]: (form as FormRecord<T>)[field]};

    try {
      pickSchema(field).parse(fieldData);

      // Si la validación pasa, limpiamos el error
      (errors as ErrorRecord<T>)[field] = undefined
      return true
    } catch (error) {
      if (isZodValidationError(error)) {
        return false
      }
      // Si no es un error de Zod
      (errors as ErrorRecord<T>)[field] = 'An unexpected error occurred'
      return false
    }
  }

  const validateForm = (): boolean => {
    if (!schema) return true

    try {
      (schema as ZodType<T>).parse(form)

      // Limpieza de errores
      Object.keys(errors).forEach(key => {
        (errors as ErrorRecord<T>)[key as keyof T] = undefined
      })
      return true
    } catch (error) {
      if (isZodValidationError(error)) {
        // Limpiamos errores anteriores antes de poblar los nuevos
        Object.keys(errors).forEach(key => {
          (errors as ErrorRecord<T>)[key as keyof T] = undefined
        })

        error.errors.forEach(err => {
          // Solo manejamos errores de nivel raíz (path[0] existe)
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
