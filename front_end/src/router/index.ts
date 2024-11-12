import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      name: 'Index',
      path: '/index',
      component: HomeView
    },
    {
      name: 'Map',
      path: '/map',
      component: MapView
    }
  ]
})

export default router
