// Composable
import {
  useGoogleAvatarStorage,
  useFacebookAvatarStorage
} from '@/utils/composables/useSessionStorage'

export const useMiddleware = (router) => {
  router.beforeEach((to) => {
    const googleStorage = useGoogleAvatarStorage()
    const facebookStorage = useFacebookAvatarStorage()
    const isAuthorized =
      googleStorage.getSessionStorageData() !== null && facebookStorage.getSessionStorageData() !== null

    if (to.name === 'Home' && isAuthorized === false) return { name: 'Login' }
    return
  })
}
