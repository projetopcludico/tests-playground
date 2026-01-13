<script setup>
  import SequenceCardComp from '../components/numbers/SequenceCardComp.vue'
  import { onMounted } from 'vue'
  import { useNumberStore } from '../stores/numbers'
  const numberStore = useNumberStore()

  onMounted(() => {
    numberStore.newRound(10)
  })
</script>
<template>
  <main class="flex flex-col items-center gap-10">
    <h1 class="text-4xl">Numbers Page</h1>
    <section class="flex flex-col items-center gap-2">
      <h2 class="text-2xl">Sequência de Números</h2>
      <div class="flex flex-wrap gap-5">
        <SequenceCardComp v-for="(number, index) of numberStore.visibleSequence" :number="number" :index="index" :respond="false"/>
      </div>
    </section>
    <section class="flex flex-col items-center gap-2">
      <h2 class="text-2xl">Qual número virá depois na sequência?</h2>
      <div class="flex flex-wrap gap-5">
        <SequenceCardComp v-for="(number, index) of numberStore.options" :index="index" :number="number" :respond="true" @respond="numberStore.checkAnswer"/>
      </div>
    </section>
  </main>
</template>
