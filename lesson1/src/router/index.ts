import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Activity from '../views/Activity.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Activity',
    props: true,
    component: Activity
  },
  {
    path: '/Tasks',
    name: 'Tasks',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Tasks.vue')
  },
  {
    path: '/Files',
    name: 'Files',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Files.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue')
  },
  {
    path: '/Kanban',
    name: 'Kanban',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Kanban.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
