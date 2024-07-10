import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { AUTH_KEY } from '@/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(AUTH_KEY)
  if (!token && to.meta.requireAuth) {
    next({
      name: 'login'
    })
  }
  next();
})

export default router
