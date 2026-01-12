<script setup>
  import SequenceCardComp from '../components/numbers/SequenceCardComp.vue'
  import { useNumberStore } from '../stores/numbers';
  const numberStore = useNumberStore();
</script>
<template>
  <main class="flex flex-col items-center">
    <h1 class="text-4xl">Numbers Page</h1>
    <div class="flex flex-wrap gap-5">
      <SequenceCardComp v-for="number of numbers" :number="number"/>
    </div>
  </main>
</template>
