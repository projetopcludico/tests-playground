import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sort/:quantidade',
      name: 'sortTest',
      component: () => import('@/views/SortTestPage.vue'),
      props: true
    }
  ],
})

export default router
