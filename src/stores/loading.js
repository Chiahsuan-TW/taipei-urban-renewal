// Base
import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define Store
export const useLoadingStore = defineStore('loading', () => {
  // Loading
  const loadingKeyList = ref([])

  // Handler
  function getLoadingStatus(key = 'page') {
    return loadingKeyList.value.indexOf(key) !== -1
  }
  function addLoadingKey(key = 'page') {
    loadingKeyList.value.push(key)
  }
  function removeLoadingKey(key = 'page') {
    const index = loadingKeyList.value.indexOf(key)
    if (index === -1) return
    loadingKeyList.value.splice(index, 1)
  }

  return {
    getLoadingStatus,
    addLoadingKey,
    removeLoadingKey
  }
})
