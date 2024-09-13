export function useSessionStorage(key) {
  function getSessionStorageData() {
    return window.sessionStorage.getItem(key)
  }

  function saveSessionStorageData(data) {
    window.sessionStorage.setItem(key, data)
    return data
  }

  function removeSessionStorageData() {
    window.sessionStorage.removeItem(key)
    return null
  }

  return {
    getSessionStorageData,
    saveSessionStorageData,
    removeSessionStorageData
  }
}

const GOOGLE_AVATAR_KEY = 'googleAvatar'
export const useGoogleAvatarStorage = () => {
  return useSessionStorage(GOOGLE_AVATAR_KEY)
}

const FACEBOOK_AVATAR_KEY = 'facebookAvatar'
export const useFacebookAvatarStorage = () => {
  return useSessionStorage(FACEBOOK_AVATAR_KEY)
}
