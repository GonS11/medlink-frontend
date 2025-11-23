<script setup lang="ts">
import {onMounted} from 'vue'
import {useUser} from '@features/user/model/useUser'
import UsersTable from '@features/user/ui/UsersTable.vue'
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import CardComponent from "@shared/ui/components/atoms/CardComponent/CardComponent.vue";
import {useRouter} from "vue-router";

const {fetchAllUsers, lockAccount, unlockAccount, users, loading, pagination} = useUser()
const router = useRouter()

onMounted(async () => {
  await fetchAllUsers()
})

const handlePageChange = async (page: number) => {
  await fetchAllUsers({page})
}

const handleLockUser = async (userId: number) => {
  if (confirm('Are you sure you want to lock this account?')) {
    await lockAccount(userId, 30, 'Locked by admin')
  }
}

const handleUnlockUser = async (userId: number) => {
  await unlockAccount(userId)
}
</script>

<template>
  <div class="users-page">
    <div class="users-header">
      <h1>{{ $t('nav.users') }}</h1>
      <ButtonComponent variant="ghost" @click="router.back()">
        ← {{ $t('common.back') }}
      </ButtonComponent>
    </div>

    <CardComponent variant="shadow" padding="lg">
      <UsersTable
        :users="users"
        :pagination="pagination"
        :loading="loading"
        @lock="handleLockUser"
        @unlock="handleUnlockUser"
        @page-change="handlePageChange"
      />
    </CardComponent>
  </div>
</template>


<style scoped lang="scss">
@use '@/shared/styles/_variables' as *;


.users-page {
  padding: $spacing-2xl;
  max-width: 1400px;
  margin: 0 auto;
}

.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-2xl;

  h1 {
    font-size: $font-size-3xl;
    margin: 0;
  }
}
</style>
