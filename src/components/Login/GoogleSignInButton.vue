<script setup>
import { onMounted } from 'vue'
import { useGoogleAvatarStorage } from '@/utils/composables/useLocalStorage'

onMounted(() => initGoogleSignInButton())

const { saveLocalStorageData } = useGoogleAvatarStorage()

const GOOGLE_SIGN_IN_BUTTON = 'google-sign-in-button'

function initGoogleSignInButton() {
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse
  })
  google.accounts.id.renderButton(document.querySelector(`#${GOOGLE_SIGN_IN_BUTTON}`), {
    theme: 'outline',
    size: 'large',
    width: 400
  })
}

function handleCredentialResponse(response) {
  const userInfo = parseJwt(response.credential)
  saveLocalStorageData(userInfo.picture)
}

function parseJwt(token) {
  try {
    // 將 Base64 URL 安全的字符替換回標準 Base64 字符，然後解碼
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/[-_]/g, (m) => (m === '-' ? '+' : '/'))
    const jsonPayload = atob(base64)

    // 將解碼後的 JSON 字串解析為物件並返回
    return JSON.parse(decodeURIComponent(escape(jsonPayload)))
  } catch (e) {
    console.error('Invalid JWT token:', e)
    return null
  }
}
</script>

<template>
  <div :id="GOOGLE_SIGN_IN_BUTTON" />
</template>
