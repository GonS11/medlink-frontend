<script setup lang="ts">
import {toRef} from 'vue'
import {useI18n} from 'vue-i18n'
import {UserDetailViewProps} from "@entities/user/model/types/user.ui.types.ts"
import {useUserStatus} from '@entities/user/model/composables/useUserStatus'
import BadgeComponent from '@shared/ui/components/atoms/BadgeComponent/BadgeComponent.vue'
import DetailSection from '@shared/ui/components/molecules/DetailSection/DetailSection.vue'
import SkeletonLoader from '@shared/ui/components/atoms/SkeletonLoader/SkeletonLoader.vue'
import DataField from '@shared/ui/components/molecules/DataFieldComponent/DataFieldComponent.vue'
import UserAvatar from '../UserAvatar/UserAvatar.vue'

const props = defineProps<UserDetailViewProps>()
const {d} = useI18n()

const userRef = toRef(props, 'user')
const {statusText, statusVariant} = useUserStatus(userRef)
</script>

<template>
  <div class="user-view">

    <header class="user-view__header">
      <div class="user-view__avatar-wrapper">
        <SkeletonLoader v-if="loading" circle width="80px" height="80px"/>
        <UserAvatar v-else :user="user!" size="lg"/>
      </div>

      <div class="user-view__title-group">
        <template v-if="loading">
          <SkeletonLoader width="250px" height="2rem" class="mb-2"/>
          <SkeletonLoader width="180px" height="1rem"/>
        </template>
        <template v-else-if="user">
          <h2 class="user-view__name">{{ user.fullName }}</h2>
          <p class="user-view__subtitle">{{ user.email }}</p>

          <div class="user-view__badges">
            <BadgeComponent :variant="statusVariant">{{ statusText }}</BadgeComponent>
            <BadgeComponent variant="info">{{ $t(`roles.${user.role}`) }}</BadgeComponent>
          </div>
        </template>
      </div>
    </header>

    <hr class="user-view__divider"/>

    <div class="user-view__grid">

      <DetailSection :title="$t('entities.user.personalInfo')">
        <DataField
          :label="$t('fields.firstName')"
          :value="user?.firstName"
          :loading="loading"
        />
        <DataField
          :label="$t('fields.lastName')"
          :value="user?.lastName"
          :loading="loading"
        />
        <DataField
          :label="$t('fields.secondLastName')"
          :value="user?.secondLastName"
          :loading="loading"
        />
      </DetailSection>

      <DetailSection :title="$t('entities.user.contactInfo')">
        <DataField
          :label="$t('fields.email')"
          :value="user?.email"
          :loading="loading"
        />
        <DataField
          :label="$t('fields.phone')"
          :value="user?.phone"
          :loading="loading"
        />
        <DataField
          :label="$t('fields.mobile')"
          :value="user?.mobilePhone"
          :loading="loading"
        />
      </DetailSection>

      <DetailSection :title="$t('entities.user.accountInfo')">
        <DataField
          :label="$t('fields.role')"
          :loading="loading"
        >
          <span v-if="user">{{ $t(`roles.${user.role}`) }}</span>
        </DataField>

        <DataField
          :label="$t('fields.lastLogin')"
          :loading="loading"
        >
          <span v-if="user?.lastLogin">{{ d(new Date(user.lastLogin), 'long') }}</span>
        </DataField>

        <DataField
          :label="$t('fields.emailVerified')"
          :loading="loading"
        >
          <BadgeComponent v-if="user" :variant="user.emailVerified ? 'success' : 'warning'" size="sm">
            {{ user.emailVerified ? $t('common.yes') : $t('common.no') }}
          </BadgeComponent>
        </DataField>
      </DetailSection>

      <DetailSection
        v-if="loading || user?.isAccountLocked"
        :title="$t('entities.user.lock.action')"
        variant="alert"
        class="user-view__section--full"
      >
        <DataField
          :label="$t('entities.user.lock.reason')"
          :value="user?.lockReason"
          :loading="loading"
        />
      </DetailSection>

    </div>
  </div>
</template>

<style scoped lang="scss" src="./UserDetailView.scss"></style>
