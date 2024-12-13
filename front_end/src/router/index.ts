import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MapView from '@/views/MapView.vue'
import CommunityView from '@/views/CommunityView.vue'
import MyView from '@/views/MyView.vue'
import Diary from '@/components/My/diary.vue'
import Login from '@/layout/Login/Login.vue'
import Register from '@/layout/Login/Register.vue'
import Detail from '@/views/AboutView.vue'

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
      component: HomeView,
      meta: {
        'KeepAlive': true
      }
    },
    {
      name: 'Map',
      path: '/map',
      component: MapView,
      meta: {
        'KeepAlive': true
      }
    },
    {
      name: 'Community',
      path: '/community',
      component: CommunityView,
      meta: {
        'KeepAlive': true
      }
    },
    {
      name: 'My',
      path: '/my',
      component: MyView,
      meta: {
        'KeepAlive': true
      }
    },
    {
      name: 'Diary',
      path: '/diary',
      component: Diary,
      meta: {
        'KeepAlive': false
      }
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
      meta: {
        'KeepAlive': false
      }
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
      meta: {
        'KeepAlive': false
      }
    },
    {
      name: 'Detail',
      path: '/detail',
      component: Detail,
      meta: {
        'KeepAlive': true
      }
    }
  ]
})

export default router
