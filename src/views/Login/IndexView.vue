<script setup>
// Components
import GoogleSignInButton from '@/components/Login/GoogleSignInButton.vue'
import FacebookSignInButton from '@/components/Login/FacebookSignInButton.vue'
// Base
import { ref, onUnmounted } from 'vue'
// Store
import { useUserStore } from '@/stores/user'
// Composables
import { useGoogleAvatarStorage } from '@/utils/composables/useLocalStorage'

const { getLocalStorageData } = useGoogleAvatarStorage()
const isGoogleAuthorized = ref(getLocalStorageData() !== null)

document.addEventListener('visibilitychange', setGoogleAuthorized)
onUnmounted(() => document.removeEventListener('visibilitychange', setGoogleAuthorized))
function setGoogleAuthorized() {
  isGoogleAuthorized.value = getLocalStorageData() !== null
}

const { setUserCoordinates } = useUserStore()

getUserCurrentLocationHandler()
function getUserCurrentLocationHandler() {
  navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  })
}

function successHandler(position) {
  const { latitude, longitude } = position.coords
  setUserCoordinates([latitude, longitude])
}

function errorHandler(error) {
  setUserCoordinates(undefined)
  console.error(error)
}
</script>

<template>
  <main class="login-page">
    <div class="login-box">
      <h1>新北市都市更新地點查詢</h1>
      <div class="button-wrapper">
        <FacebookSignInButton v-if="isGoogleAuthorized" />
        <GoogleSignInButton @google-login="setGoogleAuthorized" v-else />
      </div>
      <p class="login-note">*請依序登入 Google 及 Facebbok 帳戶以開始使用</p>
    </div>
    <a
      class="attribution"
      target="_blank"
      href="https://www.freepik.com/free-photo/cityscape-view-sceneric-urban-downtown_2792008.htm"
      >Image by rawpixel.com on Freepik</a
    >
  </main>
</template>

<style scoped>
h1 {
  color: #fff;
  margin-bottom: 2rem;
  font-weight: 500;
}

.login-page {
  background-image: url('../../assets/images//urban-view.jpg');
  background-size: cover;
  height: 100dvh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  padding: 2rem 3rem;
  min-width: 30%;
  max-width: 32rem;
  border-radius: 1rem;
  background-color: rgba(100, 100, 100, 0.8);
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.login-note {
  margin-top: 3rem;
  color: #e8ad38;
  font-weight: 700;
}

.attribution {
  position: fixed;
  bottom: 1rem;
  color: #fff;
}
</style>
