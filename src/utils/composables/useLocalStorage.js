export function useLocalStorage(key) {
  function getLocalStorageData() {
    return window.localStorage.getItem(key)
  }

  function saveLocalStorageData(data) {
    window.localStorage.setItem(key, data)
    return data
  }

  function removeLocalStorageData() {
    window.localStorage.removeItem(key)
    return null
  }

  return {
    getLocalStorageData,
    saveLocalStorageData,
    removeLocalStorageData
  }
}

const GOOGLE_AVATAR_KEY = 'googleAvatar'
export const useGoogleAvatarStorage = () => {
  return useLocalStorage(GOOGLE_AVATAR_KEY)
}
