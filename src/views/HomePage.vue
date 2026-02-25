<script setup>
  import { onMounted } from 'vue'
  import { useNumberStore } from '../stores/numbers';
  const numberStore = useNumberStore()

  onMounted(() => {
    numberStore.generateSequence(11, 3, 9, 20, 'easy');
  })
</script>
<template>
  <h1>{{ numberStore.dificulty }}</h1>
  <div class="flex gap-2">
    <div class="bg-blue-400 text-white text-center py-5 w-20 rounded-lg " v-for="number of numberStore.visibleSequence">
      <p>{{ number }}</p>
    </div>
  </div>
  <div>{{ numberStore.correctIndex }}</div>
</template>