import {ref} from 'vue'
import {useNotification} from '@shared/lib/notification'
import {useI18n} from "vue-i18n";
import {AsyncActionOptions} from "@shared/types/composables.types.ts";

export function useAsyncAction() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const notification = useNotification()
  const {t} = useI18n()

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
      const message = err.response?.data?.message || errorMessage || t('common.errorOcurred')
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
