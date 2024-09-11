// Composable
import {
  useGoogleAvatarStorage,
  useFacebookAvatarStorage
} from '@/utils/composables/useLocalStorage'

export const useMiddleware = (router) => {
  router.beforeEach((to) => {
    const googleStorage = useGoogleAvatarStorage()
    const facebookStorage = useFacebookAvatarStorage()
    const isAuthorized =
      googleStorage.getLocalStorageData() !== null && facebookStorage.getLocalStorageData() !== null

    if (to.name === 'Home' && isAuthorized === false) return { name: 'Login' }
    return
  })
}
