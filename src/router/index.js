import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomePage.vue'),
      name: 'HomePage'
    },
    {
      path: '/sounds/:numberSounds/:size/:discover/:timeLimit/',
      component: () => import('@/views/SoundsPage.vue'),
      name: 'SoundsPage',
      props: true,
    },
  ],
})

export default router
