import {ref, computed, watch} from 'vue'
import {UseFormFieldOptions} from "@shared/types/form.types.ts";

export function useFormField<T>(options: UseFormFieldOptions<T>) {
  const {
    initialValue,
    validator,
    validateOn = 'blur',
    debounceMs = 0,
    required = false
  } = options

  // Estado
  const value = ref<T>(initialValue) as any
  const error = ref<string>('')
  const isDirty = ref(false)
  const isTouched = ref(false)
  const isValidating = ref(false)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  // Computed
  const isValid = computed(() => !error.value)
  const isInvalid = computed(() => isDirty.value && !!error.value)
  const isEmpty = computed(() => {
    const val = value.value
    return val === '' || val === null || val === undefined ||
      (Array.isArray(val) && val.length === 0)
  })
  const hasError = computed(() => !!error.value)

  // Validación
  const validate = async (): Promise<boolean> => {
    // Validación de required
    if (required && isEmpty.value) {
      error.value = 'Este campo es requerido'
      return false
    }

    // Si está vacío y no es requerido, es válido
    if (isEmpty.value && !required) {
      error.value = ''
      return true
    }

    // Validación con Zod
    if (!validator) return true

    isValidating.value = true
    error.value = ''

    try {
      await validator.parseAsync(value.value)
      error.value = ''
      return true
    } catch (err: any) {
      if (err.errors && err.errors.length > 0) {
        error.value = err.errors[0].message
      } else {
        error.value = 'Valor inválido'
      }
      return false
    } finally {
      isValidating.value = false
    }
  }

  const validateDebounced = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    debounceTimer = setTimeout(() => {
      validate()
    }, debounceMs)
  }

  // Handlers
  const handleBlur = async () => {
    isTouched.value = true
    if (validateOn === 'blur' || validateOn === 'both') {
      await validate()
    }
  }

  const handleChange = () => {
    isDirty.value = true
    if (validateOn === 'change' || validateOn === 'both') {
      if (debounceMs > 0) {
        validateDebounced()
      } else {
        validate()
      }
    }
  }

  // Utilities
  const reset = () => {
    value.value = initialValue
    error.value = ''
    isDirty.value = false
    isTouched.value = false
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
  }

  const setError = (message: string) => {
    error.value = message
  }

  const clearError = () => {
    error.value = ''
  }

  const setValue = (newValue: T) => {
    value.value = newValue
    if (validateOn === 'change' || validateOn === 'both') {
      handleChange()
    }
  }

  // Watch para validación automática en 'change'
  if (validateOn === 'change' || validateOn === 'both') {
    watch(value, () => {
      handleChange()
    })
  }

  return {
    // Estado
    value,
    error,
    isDirty,
    isTouched,
    isValidating,

    // Computed
    isValid,
    isInvalid,
    isEmpty,
    hasError,

    // Métodos
    validate,
    handleBlur,
    handleChange,
    reset,
    setError,
    clearError,
    setValue,
  }
}

/**
 * Tipo de retorno para uso en componentes
 */
export type FormField<T> = ReturnType<typeof useFormField<T>>
