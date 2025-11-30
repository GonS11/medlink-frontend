import {ref} from 'vue'
import {RememberMeProps} from "@features/auth/model/auth.types.ts";

const REMEMBER_ME_KEY = 'rememberMe'
const EXPIRY_DAYS = 30

export function useRememberMe() {
  const rememberMe = ref(false)

  const loadSavedEmail = (): string => {
    const savedData = localStorage.getItem(REMEMBER_ME_KEY)

    if (!savedData) {
      return ''
    }

    try {
      const {email, expiry} = JSON.parse(savedData) as RememberMeProps

      if (expiry > Date.now()) {
        rememberMe.value = true
        return email
      } else {
        localStorage.removeItem(REMEMBER_ME_KEY)
        return ''
      }
    } catch (error) {
      localStorage.removeItem(REMEMBER_ME_KEY)
      return ''
    }
  }

  const saveEmail = (email: string) => {
    if (rememberMe.value) {
      const expiryDate = Date.now() + (EXPIRY_DAYS * 24 * 60 * 60 * 1000)
      localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify({
        email,
        expiry: expiryDate
      }))
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY)
    }
  }

  const clearSavedEmail = () => {
    localStorage.removeItem(REMEMBER_ME_KEY)
    rememberMe.value = false
  }

  return {
    rememberMe,
    loadSavedEmail,
    saveEmail,
    clearSavedEmail,
  }
}
