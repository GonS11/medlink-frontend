<script setup lang="ts">
import {toRef} from 'vue'
import BadgeComponent from '@shared/ui/components/atoms/BadgeComponent/BadgeComponent.vue'
import {useUserStatus} from '@entities/user/model/composables/useUserStatus'
import {UserStatusBadgeProps} from "@entities/user/model/types/user.ui.types.ts";

const props = withDefaults(defineProps<UserStatusBadgeProps>(), {
  size: 'md'
})

const userRef = toRef(props, 'user')
const {statusText, statusVariant} = useUserStatus(userRef)
</script>


<template>
  <BadgeComponent
    class="user-status-badge"
    :variant="statusVariant"
    :size="size"
  >
    {{ statusText }}
  </BadgeComponent>
</template>
