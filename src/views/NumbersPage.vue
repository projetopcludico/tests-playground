<script setup>
  import SequenceCardComp from '../components/numbers/SequenceCardComp.vue';
  import { onMounted } from 'vue';
  import { useNumberStore } from '../stores/numbers';
  const numberStore = useNumberStore();

  onMounted(() => {
    numberStore.newRound(10);
  })
</script>
<template>
  <main class="flex flex-col items-center">
    <h1 class="text-4xl">Numbers Page</h1>
    <div class="flex flex-wrap gap-5">
      <SequenceCardComp v-for="number of numberStore.visibleSequence" :number="number"/>
    </div>
    <div>
      <SequenceCardComp v-for="number in numberStore.options" :number="number"/>
    </div>
  </main>
</template>
