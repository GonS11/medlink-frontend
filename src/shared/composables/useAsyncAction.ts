// ✅ CORRECTO - useAsyncAction.ts
import {ref} from 'vue'
import {useNotification} from '@shared/lib/notification'

interface AsyncActionOptions {
  successMessage?: string
  errorMessage?: string
  showSuccessNotification?: boolean
  showErrorNotification?: boolean
  onSuccess?: () => void | Promise<void>
  onError?: (error: any) => void
}

export function useAsyncAction() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const notification = useNotification()

  const execute = async <T>(
    action: () => Promise<T>,
    options: AsyncActionOptions = {}
  ): Promise<T | null> => {
    const {
      successMessage,
      errorMessage,
      showSuccessNotification = true,
      showErrorNotification = true,
      onSuccess,
      onError,
    } = options

    loading.value = true
    error.value = null

    try {
      const result = await action()

      if (successMessage && showSuccessNotification) {
        notification.success(successMessage)
      }

      if (onSuccess) {
        await onSuccess()
      }

      return result
    } catch (err: any) {
      const message = err.response?.data?.message || errorMessage || 'An error occurred'
      error.value = message

      if (showErrorNotification) {
        notification.error(message)
      }

      if (onError) {
        onError(err)
      }

      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    execute,
  }
}
