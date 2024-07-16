import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'
import { getAuthToken } from '@/utils'

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
    },
    {
      path: '/file',
      name: 'file',
      component: () => import('../views/FileView/index.vue'),
      meta: {
        requireAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const token = getAuthToken();
  if (!token && to.meta.requireAuth) {
    next({
      name: 'login'
    })
  }
  next();
})

export default router
