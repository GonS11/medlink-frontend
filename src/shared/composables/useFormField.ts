import {ref, computed, watch, onBeforeUnmount} from 'vue' // ✅ Añadir onBeforeUnmount
import {UseFormFieldOptions} from "@shared/types/form.types.ts";
import {useI18n} from "vue-i18n";

export function useFormField<T>(options: UseFormFieldOptions<T>) {
  const {
    initialValue,
    validator,
    validateOn = 'blur',
    debounceMs = 0,
    required = false
  } = options

  const {t} = useI18n()

  // Estado
  const value = ref<T>(initialValue) as any
  const error = ref<string>('')
  const isDirty = ref(false)
  const isTouched = ref(false)
  const isValidating = ref(false)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  // ✅ CLEANUP del timer en unmount
  onBeforeUnmount(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
  })

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
    if (required && isEmpty.value) {
      error.value = t('validation.thisFieldRequired')
      return false
    }

    if (isEmpty.value && !required) {
      error.value = ''
      return true
    }

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
        error.value = t('validation.invalidValue')
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
    // ✅ Limpiar timer en reset
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
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
    value,
    error,
    isDirty,
    isTouched,
    isValidating,
    isValid,
    isInvalid,
    isEmpty,
    hasError,
    validate,
    handleBlur,
    handleChange,
    reset,
    setError,
    clearError,
    setValue,
  }
}

export type FormField<T> = ReturnType<typeof useFormField<T>>
