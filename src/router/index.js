import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'homeTest',
      component: () => import('@/views/HomeTestPage.vue')
    },
    {
      path: '/sort/:numberForms/:size/:discovers',
      name: 'sortTest',
      component: () => import('@/views/SortTestPage.vue'),
      props: true
    }
  ],
})

export default router
