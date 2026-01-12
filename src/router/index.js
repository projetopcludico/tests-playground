import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/numbers',
      name: 'NumbersPage',
      component: () => import('@/views/NumbersPage.vue'),
    },
  ],
})

export default router
