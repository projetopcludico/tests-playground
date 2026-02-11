<script setup>
import { onMounted } from 'vue'
import { useSequenceStore } from '../stores/sequence'
const sequenceStore = useSequenceStore()

const itens = [
  {
    id: 1,
    name: 'quadrado',
    icon: 'mdi mdi-square',
  },
  {
    id: 2,
    name: 'circulo',
    icon: 'mdi mdi-circle',
  },
  {
    id: 3,
    name: 'retangulo',
    icon: 'mdi mdi-rectangle',
  },
  {
    id: 4,
    name: 'triangulo',
    icon: 'mdi mdi-triangle',
  },
]

const isDiscover = (item) => item.object.name == 'discover'

function tryAgain() {
    sequenceStore.mountSequence(2, 8, 2, itens)
}

onMounted(() => {
  tryAgain()
})
</script>
<template>
  <div class="flex gap-10 w-full justify-center p-20 mb-20">
    <button
      class="flex flex-col items-center justify-center w-15 h-15 border rounded-xl text-white bg-sky-500"
      :style="{ cursor: isDiscover(item) ? 'pointer' : 'default' }"
      :disabled="!isDiscover(item)"
      v-for="(item, index) of sequenceStore.sequence"
      :key="index"
      @click="sequenceStore.respond(index, tryAgain)"
    >
      <span class="text-2xl" :class="item.object?.icon"></span>
    </button>
  </div>
  <div class="flex gap-10 w-full justify-center">
    <button
      class="flex flex-col items-center justify-center w-15 h-15 border rounded-xl text-white bg-sky-500"
      v-for="(item, index) in sequenceStore.finalChoices"
      @click="sequenceStore.selectObjectId(item.id)"    
    >
        <span class="text-2xl" :class="item.icon"></span>
    </button>
  </div>
</template>
