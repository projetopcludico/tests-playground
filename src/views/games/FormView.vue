<script setup>
import GameButton from '@/components/GameButton.vue'
import { onMounted, onUnmounted } from 'vue'
import { useApplicationStore } from '@/stores/application'
import { useSequenceStore } from '@/stores/sequence'
import { useTimeStamp } from '@/stores/timeStamp'
const applicationStore = useApplicationStore()
const sequenceStore = useSequenceStore()
const timeStamp = useTimeStamp()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

function tryAgain() {
  const currentDifficulty = route.params.difficulty
  const params = applicationStore.formDifficulties[currentDifficulty].params
  const { timeLimit } = applicationStore.formDifficulties[currentDifficulty]

  sequenceStore.mountObjectSequence(
    params.numberForms,
    params.size,
    params.discovers,
    applicationStore.formSymbols,
  )

  timeStamp.start(true, timeLimit, () => {
    console.warn('Acabou o tempo!')
  })
}

onMounted(tryAgain)

onUnmounted(() => {
  timeStamp.reset()
})
</script>

<template>
  <div class="flex flex-col gap-20 p-10 min-h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.65)),url('/images/egypt-background.svg')] bg-cover bg-center">
    <section class="flex items-center justify-between text-4xl text-zinc-400">
      <span class="mdi mdi-home cursor-pointer" @click="router.push('/')"></span>
      <span class="mdi mdi-cog cursor-pointer"></span>
    </section>
    <section class="grid grid-cols-4 gap-20">
      <div class="flex flex-col gap-5 col-span-1 px-5 text-white">
        <h2 class="font-bold">Tempo restante: {{ timeStamp.formattedTime }}</h2>
        <p class="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, dolore facilis?
          Doloremque magnam ex blanditiis minus illo molestias libero accusantium vero eius
          voluptate. Commodi error in autem delectus asperiores et Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Adipisci aliquid consequatur illo voluptatem praesentium
          sequi eum qui temporibus velit, doloremque natus delectus ipsum eligendi. Ipsa ratione
          quis nisi sequi fugiat.
        </p>
      </div>
      <div class="flex flex-col gap-10 col-span-3">
        <div class="flex justify-center gap-5">
          <GameButton
            v-for="symbol of sequenceStore.finalChoices"
            :id="symbol.id"
            :icon="symbol.icon"
            :color="symbol.color"
            :background="symbol.background"
            @select="sequenceStore.selectChoice(symbol)"
            :selected="sequenceStore.selectedChoice?.id === parseInt(symbol.id)"
            class="cursor-pointer"
          />
        </div>
        <div class="flex flex-wrap gap-5">
          <GameButton
            v-for="(symbol, index) in sequenceStore.sequence"
            :id="symbol.object.id"
            :icon="symbol.object.icon"
            :color="symbol.object.color"
            :background="symbol.object.background"
            :name="symbol.object.name"
            :class="[sequenceStore.selectedChoice && symbol.object.name === 'discover' && 'animate-shake']"
            @select="sequenceStore.answerObjectSequence(index, 'forms', tryAgain)"
          />
        </div>
        <div class="text-white text-2xl">
          <p>Acertos: {{ applicationStore.formResponses }}/{{ applicationStore.requiredResponses.forms }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
