import Vue from 'vue'
import VueRouter from 'vue-router'
import MainScreen from '../components/MainScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainScreen',
    component: MainScreen,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/GameInfo.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router