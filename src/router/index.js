// Base
import { createRouter, createWebHistory } from 'vue-router'
// Middleware
import { useMiddleware } from './middleware'

const Login = () => import('@/views/Login/IndexView.vue')
const Home = () => import('@/views/Home/IndexView.vue')
const NotFound = () => import('@/views/NotFound/IndexView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

useMiddleware(router)

export default router
