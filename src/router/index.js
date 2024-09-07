import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/Login/IndexView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export default router
