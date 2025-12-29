import {storeToRefs} from 'pinia'
import * as userService from '../../api/user.service'
import {useEntityCrud} from '@shared/composables/useEntityCrud'
import {useI18n} from "vue-i18n"
import {useUserStore} from "@entities/user/model/store/users.store.ts"
import {UpdateUserRequest, UserResponse} from "@entities/user/model/types/user.types.ts"
import {RegisterRequest} from "@entities/auth/model/types/auth.types.ts"

export function useUserCrud() {
  const store = useUserStore()
  const {t} = useI18n()
  const {users, pagination} = storeToRefs(store)

  const entityStore = {
    items: users,
    pagination: pagination,
    setItems: store.setUsers,
    setPagination: store.setPagination,
    updateItem: store.updateUser,
    removeItem: store.removeUser,
  }

  const entityService = {
    getAll: userService.getAllUsers,
    getById: userService.getUserById,
    create: userService.createUser,
    update: userService.updateUser,
    delete: userService.deleteUser,
  }

  return useEntityCrud<UserResponse, RegisterRequest, UpdateUserRequest>(
    entityStore,
    entityService,
    t('entities.user.name'),
    {
      refetchAfterCreate: false,
      refetchAfterUpdate: false,
      refetchAfterDelete: false,
    }
  )
}
