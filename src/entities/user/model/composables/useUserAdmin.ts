import {useAsyncAction} from '@shared/composables/useAsyncAction'
import * as adminService from '../../api/user-admin.service'
import type {ChangePasswordRequest, LockAccountRequest} from '../types/user.types'
import {useI18n} from "vue-i18n"

export function useUserAdmin() {
  const {execute} = useAsyncAction()
  const {t} = useI18n()

  const lockUser = async (id: number, data?: LockAccountRequest) => {
    return execute(
      async () => {
        await adminService.lockAccount(id, data || {})
      },
      {
        successMessage: data?.durationMinutes
          ? t('entities.user.lock.time', {duration: data.durationMinutes})
          : t('entities.user.lock.indefinitely'),
        errorMessage: t('entities.user.lock.failed'),
      }
    )
  }

  const unlockUser = async (id: number) => {
    return execute(
      async () => {
        await adminService.unlockAccount(id)
      },
      {
        successMessage: t('entities.user.unlock.success'),
        errorMessage: t('entities.user.unlock.failed'),
      }
    )
  }

  const changePassword = async (userId: number, data: ChangePasswordRequest) => {
    return execute(
      async () => {
        await adminService.changePassword(userId, data)
      },
      {
        successMessage: t('entities.user.password.success'),
        errorMessage: t('entities.user.password.failed'),
      }
    )
  }

  return {
    lockUser,
    unlockUser,
    changePassword,
  }
}
