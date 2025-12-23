import {ref, type Ref} from 'vue'
import {ModalOptions} from "@shared/types/composables.types.ts";
import {useI18n} from "vue-i18n";

export function useModal<T = any>(defaultOptions: ModalOptions = {}) {
  const {t} = useI18n()

  const show = ref(false)
  const data = ref<T | null>(null) as Ref<T | null>
  const options = ref<ModalOptions>({
    title: '',
    confirmText: t('common.confirm'),
    cancelText: t('common.cancel'),
    variant: 'primary',
    size: 'md',
    ...defaultOptions,
  })

  const open = (newData?: T, newOptions?: ModalOptions) => {
    if (newData !== undefined) {
      data.value = newData
    }

    if (newOptions) {
      options.value = {
        ...options.value,
        ...newOptions,
      }
    }

    show.value = true
  }

  const close = () => {
    show.value = false

    // Limpiar data después de la animación
    setTimeout(() => {
      data.value = null
    }, 300)
  }

  const updateData = (newData: T) => {
    data.value = newData
  }

  const reset = () => {
    show.value = false
    data.value = null
    options.value = {
      title: '',
      confirmText: t('common.confirm'),
      cancelText: t('common.cancel'),
      variant: 'primary',
      size: 'md',
      ...defaultOptions,
    }
  }

  // ✅ RETORNAR REFS MUTABLES, no computed
  return {
    show,           // Ref<boolean> - mutable para v-model
    data,           // Ref<T | null> - mutable
    options,        // Ref<ModalOptions> - mutable
    open,
    close,
    updateData,
    reset,
  }
}
