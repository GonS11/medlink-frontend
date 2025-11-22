import {POSITION, TYPE, useToast} from 'vue-toastification'
import {ToastOptions} from "vue-toastification/dist/types/types";

type NotificationOptions = Omit<ToastOptions, 'type'>

const defaultOptions: Partial<NotificationOptions> = {
  position: POSITION.TOP_RIGHT,
  timeout: 4000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: true,
  icon: true,
  rtl: false,
}

export function useNotification() {
  const toast = useToast()

  return {
    success(message: string, options?: Partial<NotificationOptions>) {
      toast.success(message, {...defaultOptions, ...options})
    },

    error(message: string, options?: Partial<NotificationOptions>) {
      toast.error(message, {...defaultOptions, ...options})
    },

    warning(message: string, options?: Partial<NotificationOptions>) {
      toast.warning(message, {...defaultOptions, ...options})
    },

    info(message: string, options?: Partial<NotificationOptions>) {
      toast.info(message, {...defaultOptions, ...options})
    },

    custom(message: string, options?: Partial<ToastOptions>) {
      toast(message, {
        ...defaultOptions,
        ...options,
        type: TYPE.DEFAULT
      } as ToastOptions)
    },

    clear() {
      toast.clear()
    },
  }
}
