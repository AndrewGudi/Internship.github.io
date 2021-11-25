import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Tasks from '../views/Tasks.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/Activity',
    name: 'Activity',
    component: () => import('../views/Activity.vue')
  },
  {
    path: '/Files',
    name: 'Files',
    component: () => import('../views/Files.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/Kanban',
    name: 'Kanban',
    component: () => import('../views/Kanban.vue')
  },
  {
    path: '/:NotFoundPage(.*)*',
    name: 'NotFound',
    component: () => import('../components/Layout/NotFoundPage/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
