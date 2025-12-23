import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false)
  const requestCount = ref(0)

  function startLoading() {
    if (requestCount.value === 0) {
      isLoading.value = true
    }
    requestCount.value++
  }

  function stopLoading() {
    if (requestCount.value > 0) {
      requestCount.value--
    }
    if (requestCount.value === 0) {
      isLoading.value = false
    }
  }

  function resetLoading() {
    requestCount.value = 0
    isLoading.value = false
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
    resetLoading
  }
})
