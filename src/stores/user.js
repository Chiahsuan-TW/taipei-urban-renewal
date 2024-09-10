import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userCoordinates = ref(undefined)

  function setUserCoordinates(coordinates) {
    userCoordinates.value = coordinates
  }

  return { userCoordinates, setUserCoordinates }
})
