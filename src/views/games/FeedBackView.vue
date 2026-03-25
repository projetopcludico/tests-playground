<script setup>
import AppButton from '@/components/AppButton.vue';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application';
const route = useRoute();
const router = useRouter();
const applicationStore = useApplicationStore();

const success = computed(() => parseInt(route.params.hits) >= parseInt(route.params.required));

const mode = computed(() => {
  if (route.params.mode === 'forms') return 'Formas'
  if (route.params.mode === 'sounds') return 'Sons'
  if (route.params.mode === 'numbers') return 'Números'

  return
});

const difficulty = computed(() => {
  if (route.params.difficulty === 'easy') return 'Fácil'
  if (route.params.difficulty === 'medium') return 'Médio'
  if (route.params.difficulty === 'hard') return 'Difícil'

  return
});

function goNext() {
    const nextRoute = applicationStore.getNextRoute({
        mode: route.params.mode,
        difficulty: route.params.difficulty,
        success: success.value
    })

    router.push(nextRoute)
}

function repeatLevel() {
    const repeatRoute = applicationStore.repeatLevelRoute({
        mode: route.params.mode,
        difficulty: route.params.difficulty
    })

    router.push(repeatRoute)
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-between w-screen h-screen overflow-hidden p-10 text-red-400"
  >
    <section class="flex flex-col items-center gap-5">
      <h1 v-if="success" class="text-4xl">Parabéns</h1>
      <h1 v-else class="text-4xl">Quase lá!</h1>
      <p v-if="success" class="text-2xl">Você conseguiu</p>
      <p v-else class="text-2xl">Você pode melhorar!</p>
      <img src="/images/feedback.svg" alt="feedback-image" />
    </section>
    <section class="w-1/2 text-2xl border-2 border-red-400 rounded-xl p-10">
      <p class="text-blue-300">Modo: {{ mode }}</p>
      <p class="text-purple-400">Dificuldade: {{ difficulty }}</p>
      <p class="text-yellow-300">Desempenho: {{ route.params.hits }}/{{ route.params.required }} padrões completados</p>
    </section>
    <section class="w-1/2 flex gap-5">
        <AppButton text="Início" @function="router.push({ name: 'home-view' })"/>
        <AppButton text="Repetir" color="purple" @function="repeatLevel"/>
        <AppButton v-if="success" text="Avançar" color="blue" @function="goNext"/>
    </section>
  </div>
</template>
