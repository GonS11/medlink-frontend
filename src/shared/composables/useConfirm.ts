import {defineStore} from 'pinia'
import {ref} from 'vue'
import {ConfirmOptions} from "@shared/types/composables.types"
import {useI18n} from "vue-i18n"

// ✅ SOLUCIÓN: Usar Pinia store en lugar de variables globales
export const useConfirmStore = defineStore('confirm', () => {
  const showConfirm = ref(false)
  const confirmOptions = ref<ConfirmOptions | null>(null)
  let resolvePromise: ((value: boolean) => void) | null = null

  function resetState() {
    showConfirm.value = false
    confirmOptions.value = null
    resolvePromise = null
  }

  function setOptions(options: ConfirmOptions) {
    confirmOptions.value = options
  }

  function setResolve(resolve: (value: boolean) => void) {
    resolvePromise = resolve
  }

  function resolve(value: boolean) {
    if (resolvePromise) {
      resolvePromise(value)
      resetState()
    }
  }

  return {
    showConfirm,
    confirmOptions,
    setOptions,
    setResolve,
    resolve,
    resetState,
  }
})

// Composable que usa el store
export function useConfirm() {
  const {t} = useI18n()
  const store = useConfirmStore()

  function confirm(options: ConfirmOptions): Promise<boolean> {
    const fullOptions = {
      confirmText: t('common.confirm'),
      cancelText: t('common.cancel'),
      variant: 'primary' as const,
      ...options,
    }

    store.setOptions(fullOptions)
    store.showConfirm = true

    return new Promise<boolean>((resolve) => {
      store.setResolve(resolve)
    })
  }

  function handleConfirm() {
    store.resolve(true)
  }

  function handleCancel() {
    store.resolve(false)
  }

  return {
    showConfirm: store.showConfirm,
    confirmOptions: store.confirmOptions,
    confirm,
    handleConfirm,
    handleCancel,
  }
}
