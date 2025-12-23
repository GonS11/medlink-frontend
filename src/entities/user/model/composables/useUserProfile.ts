import {useAsyncAction} from '@shared/composables/useAsyncAction'
import {useUserStore} from '../store/users.store'
import {storeToRefs} from 'pinia'
import * as userService from '../../api/user.service'
import {useI18n} from "vue-i18n"

export function useUserProfile() {
  const {execute} = useAsyncAction()
  const {t} = useI18n()
  const store = useUserStore()
  const {currentUserProfile} = storeToRefs(store)

  const fetchCurrentUser = async () => {
    return execute(
      async () => {
        const user = await userService.getCurrentUser()
        store.setCurrentUserProfile(user)
        return user
      },
      {
        errorMessage: t('entities.user.fetchFailed'),
        showSuccessNotification: false,
      }
    )
  }

  const updateProfile = async (data: any) => {
    if (!currentUserProfile.value) return null

    return execute(
      async () => {
        const updated = await userService.updateUser(currentUserProfile.value!.id, data)
        store.setCurrentUserProfile(updated)
        return updated
      },
      {
        successMessage: t('entities.user.profile.updateSuccess'),
        errorMessage: t('entities.user.profile.updateFailed'),
      }
    )
  }

  return {
    currentUserProfile,
    fetchCurrentUser,
    updateProfile,
  }
}
