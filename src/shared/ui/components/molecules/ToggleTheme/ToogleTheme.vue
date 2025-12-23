<script setup lang="ts">
import {ref, onMounted} from 'vue'
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue"
import SunIcon from "@shared/ui/icons/SunIcon.vue";
import MoonIcon from "@shared/ui/icons/MoonIcon.vue";

const isDark = ref(false)

const toggle = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark-mode', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  isDark.value = localStorage.getItem('theme') === 'dark'
  if (isDark.value) document.documentElement.classList.add('dark-mode')
})
</script>

<template>
  <ButtonComponent
    variant="ghost"
    size="sm"
    :icon-only="true"
    @click="toggle"
    :aria-label="isDark ? $t('common.lightTheme') : $t('common.lightTheme')"
  >
    <template #icon>
      <SunIcon :label="$t('icons.lightTheme')" v-if="isDark"/>
      <MoonIcon :label="$t('icons.darkTheme')" v-else/>
    </template>
  </ButtonComponent>
</template>
