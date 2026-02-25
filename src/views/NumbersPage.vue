<script setup>
  import SequenceCardComp from '../components/numbers/SequenceCardComp.vue'
  import { onMounted } from 'vue'
  import { useNumberStore } from '../stores/numbers'
  import { useAplicationStore } from '../stores/aplication'
  const numberStore = useNumberStore()
  const aplicationStore = useAplicationStore()

  onMounted(() => {
    numberStore.generateSequence(6, 3, 3, 2, 'easy');
  });

  function respond(number) {
    const response = numberStore.checkAnswer(number);
    if(response) {
      numberStore.generateSequence(6, 3, 3, 2, 'easy');
      console.log('acertou');
    }
    console.log('errou');
  }
</script>
<template>
  <main class="flex flex-col items-center gap-10">
    <h1 class="text-4xl">Numbers Page</h1>
    <p>Respostas corretas: {{ aplicationStore.aplication.themes.numbers.countResponses }}</p>
    <section class="flex flex-col items-center gap-2">
      <h2 class="text-2xl">Sequência de Números</h2>
      <div class="flex flex-wrap gap-5">
        <SequenceCardComp v-for="(number, index) of numberStore.visibleSequence" :number="number" :index="index" :respond="false"/>
      </div>
    </section>
    <section class="flex flex-col items-center gap-2">
      <h2 class="text-2xl">Qual número virá depois na sequência?</h2>
      <div class="flex flex-wrap gap-5">
        <SequenceCardComp
          v-for="(number, index) of numberStore.options"
          :index="index"
          :number="number"
          :respond="true"
          @respond="respond"
        />
      </div>
    </section>
    <div>{{ numberStore.correctNumber }}</div>
  </main>
</template>
