<script setup lang="ts">
import {computed} from 'vue'
import {UserAvatarProps} from "@entities/user/model/types/user.ui.types.ts";

const props = withDefaults(defineProps<UserAvatarProps>(), {
  size: 'md'
})

const initials = computed(() => {
  return `${props.user.firstName[0]}${props.user.lastName[0]}`.toUpperCase()
})
</script>

<template>
  <div class="user-avatar" :class="[`user-avatar--${size}`]">
    <span class="user-avatar__initials">{{ initials }}</span>
  </div>
</template>

<style scoped lang="scss" src="./UserAvatar.scss"></style>
