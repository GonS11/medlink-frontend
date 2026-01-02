<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useUserProfile} from "@entities/user/model/composables/useUserProfile.ts";
import type {UpdateUserFormData} from '@entities/user/model/validation/user.validation'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import CardComponent from '@shared/ui/components/atoms/CardComponent/CardComponent.vue'
import UserForm from '@entities/user/ui/UserForm/UserForm.vue'
import {getInitials} from '@shared/lib/format.ts'
import {useUserCrud} from "@entities/user/model/composables/useUserCrud.ts";

const {loading} = useUserCrud()
const {fetchCurrentUser, currentUserProfile, updateProfile,} = useUserProfile()
const router = useRouter()

onMounted(async () => {
  await fetchCurrentUser()
})

const handleSubmit = async (data: UpdateUserFormData) => {
  const result = await updateProfile(data)
  if (result) {
    await fetchCurrentUser()
  }
}
</script>

<template>
  <main class="profile-page">
    <header class="profile-page__header">
      <div class="profile-page__header-content">
        <h1 class="profile-page__title">{{ $t('entities.user.profile') }}</h1>
      </div>
      <ButtonComponent variant="ghost" size="sm" @click="router.back()">
        ← {{ $t('common.back') }}
      </ButtonComponent>
    </header>

    <div class="profile-page__container">
      <div v-if="loading && !currentUserProfile" class="profile-page__state profile-page__state--loading">
        <div class="profile-page__spinner"></div>
      </div>

      <template v-else-if="currentUserProfile">
        <section class="profile-page__summary">
          <div class="profile-page__avatar">
            {{ getInitials(currentUserProfile.firstName, currentUserProfile.lastName) }}
          </div>
          <div class="profile-page__identity">
            <h2 class="profile-page__user-name">{{ currentUserProfile.fullName }}</h2>
            <p class="profile-page__user-role">{{ $t(`roles.${currentUserProfile.role}`) }}</p>
          </div>
        </section>


        <UserForm
          :user="currentUserProfile"
          mode="edit"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="router.back()"
        />
      </template>
    </div>
  </main>
</template>

<style scoped lang="scss" src="./ProfilePage.scss"></style>
