<script setup>
// Base
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
// Composable
import { useFacebookAvatarStorage } from '@/utils/composables/useSessionStorage'

const router = useRouter()

const { saveSessionStorageData } = useFacebookAvatarStorage()

onBeforeMount(async () => await loadFacebookSDK())

function loadFacebookSDK() {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: import.meta.env.VITE_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v20.0'
      })

      FB.AppEvents.logPageView()
      resolve(true) // SDK 加載完成後，resolve Promise
    }

    // 動態插入 Facebook SDK 腳本
    const d = document
    const s = 'script'
    const id = 'facebook-jssdk'
    let js
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/en_US/sdk.js'
    fjs.parentNode.insertBefore(js, fjs)
  })
}

function loginHandler() {
  FB.login(
    function (response) {
      if (response.status === 'connected') {
        FB.api(
          '/me',
          {
            fields: 'id,name,email,picture'
          },
          function (response) {
            const avatarUrl = response.picture.data.url
            saveSessionStorageData(avatarUrl)
            router.push({ name: 'Home' })
          }
        )
      }
    },
    {
      scope: 'email',
      auth_type: 'rerequest'
    }
  )
}
</script>

<template>
  <button type="button" class="facebook-login-button" @click="loginHandler">
    以 Facebook 帳戶登入
  </button>
</template>

<style scoped>
.facebook-login-button {
  width: 100%;
  height: 40px;
  background-color: #1877f2;
  color: #fff;
  border: 0px;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
