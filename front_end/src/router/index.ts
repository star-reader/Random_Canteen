import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue'
import CommunityView from '@/views/CommunityView.vue'
import MyView from '@/views/MyView.vue'
import Diary from '@/components/My/diary.vue'

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
    },
    {
      name: 'Community',
      path: '/community',
      component: CommunityView
    },
    {
      name: 'My',
      path: '/my',
      component: MyView
    },
    {
      name: 'Diary',
      path: '/diary',
      component: Diary
    }
  ]
})

export default router
