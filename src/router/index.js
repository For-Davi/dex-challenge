import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/feed',
    name: 'feed',
    component: () => import(/* webpackChunkName: "about" */ '../views/Feed.vue')
  },
  {
    path: '/:catchAll(.*)',
    component: import ('../components/PageNotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
