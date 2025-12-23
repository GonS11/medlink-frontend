import {computed, type Ref} from 'vue'
import type {UserResponse} from '../types/user.types'
import {useI18n} from 'vue-i18n'

export function useUserStatus(user: Ref<UserResponse>) {
  const {t} = useI18n()

  const statusColor = computed(() => {
    if (user.value.isAccountLocked) return 'error'
    return user.value.isActive ? 'success' : 'secondary'
  })

  const statusText = computed(() => {
    if (user.value.isAccountLocked) return t('entities.user.lock.action')
    return user.value.isActive ? t('common.active') : t('common.inactive')
  })

  const statusVariant = computed<'success' | 'error' | 'warning' | 'secondary'>(() => {
    if (user.value.isAccountLocked) return 'error'
    return user.value.isActive ? 'success' : 'secondary'
  })

  return {
    statusColor,
    statusText,
    statusVariant,
  }
}
