import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import { routeNames } from '@/constants/routeNames'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routeNames.Task,
    component: Tasks
  },
  {
    path: '/Activity',
    name: routeNames.Activity,
    component: () => import('../views/Activity.vue')
  },
  {
    path: '/Files',
    name: routeNames.Files,
    component: () => import('../views/Files.vue')
  },
  {
    path: '/Calendar',
    name: routeNames.Calendar,
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/Kanban',
    name: routeNames.Kanban,
    component: () => import('../views/Kanban.vue')
  },
  {
    path: '/:NotFoundPage(.*)*',
    name: routeNames.NotFound,
    component: () => import('../components/Layout/NotFoundPage/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
