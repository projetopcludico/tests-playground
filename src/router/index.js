import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/forms/:difficulty/',
      name: 'form-view',
      component: () => import('@/views/games/FormView.vue'),
      beforeEnter: (to, from) => {
        const difficulty = to.params.difficulty;
        if(!['easy', 'medium', 'hard'].includes(difficulty)){
          console.error(`Parâmetro de dificultade errado, você passou: ${difficulty}` )
          return '/'
        }
      }
    }
  ],
})

export default router
