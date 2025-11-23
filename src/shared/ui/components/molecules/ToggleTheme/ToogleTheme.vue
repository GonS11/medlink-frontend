<script setup lang="ts">
import {ref, onMounted} from 'vue'
import ToggleThemeIcon from "@shared/ui/icons/ToggleThemeIcon.vue";
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";

const isDark = ref(false)

// Obtener tema guardado del localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark'
  applyTheme()
})

// Aplicar el tema al HTML
const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
  }
}

// Toggle entre temas
const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}
</script>

<template>
  <ButtonComponent
    @click="toggleTheme"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <ToggleThemeIcon label="" :isDark="isDark"/>
  </ButtonComponent>
</template>

