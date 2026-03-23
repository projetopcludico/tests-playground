<script setup>
import ConfigButton from '@/components/ConfigButton.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const mode = ref('campaign')
const theme = ref('numbers')
const difficulty = ref('easy')

function changeMode(newMode) {
  mode.value = newMode
}

function changeTheme(newTheme) {
  theme.value = newTheme
}

function changeDifficulty(newDifficulty) {
  difficulty.value = newDifficulty
}

const configRoute = computed(() => `/${theme.value}/${difficulty.value}`)
const start = () => router.push(configRoute.value)
</script>
<template>
  <div class="w-full flex flex-col gap-10">
    <div class="w-full flex flex-col items-center gap-2 text-slate-900">
      <h1 class="font-bold text-4xl">Configure seu jogo</h1>
      <p class="text-lg">Selecione o modo, o tema e a dificulade do jogo</p>
    </div>
    <div
      class="w-full bg-zinc-100 rounded-xl grid grid-cols-2 gap-4 p-10 shadow-xl border-2 border-zinc-200"
    >
      <div class="w-full grid grid-cols-3 gap-3">
        <h3 class="font-bold text-lg text-orange-400 col-span-3">1. ESCOLHA O MODO DE JOGO</h3>
        <ConfigButton
          icon="mdi mdi-trophy-variant"
          text="Campanha"
          @click="changeMode('campaign')"
          :selected="mode === 'campaign'"
        />
        <ConfigButton
          icon="mdi mdi-flag"
          text="Fases"
          @click="changeMode('stages')"
          :selected="mode === 'stages'"
        />
      </div>
      <div class="w-full grid grid-cols-3 gap-3">
        <h3 class="font-bold text-lg text-orange-400 col-span-3">2. ESCOLHA O TEMA DO JOGO</h3>
        <ConfigButton
          text="Números"
          icon="mdi mdi-numeric-7-box-multiple"
          @click="changeTheme('numbers')"
          :selected="theme === 'numbers'"
          mode="outline"
        />
        <ConfigButton
          text="Formas"
          icon="mdi mdi-shape"
          @click="changeTheme('forms')"
          :selected="theme === 'forms'"
          mode="outline"
        />
        <ConfigButton
          text="Sons"
          icon="mdi mdi-waveform"
          @click="changeTheme('sounds')"
          :selected="theme === 'sounds'"
          mode="outline"
        />
      </div>
      <div class="w-full grid grid-cols-3 col-span-2 gap-3">
        <h3 class="font-bold text-lg text-orange-400 col-span-3">3. SELECIONE A DIFICULADE</h3>
        <ConfigButton
          text="Fácil"
          @click="changeDifficulty('easy')"
          :selected="difficulty === 'easy'"
          mode="outline"
        />
        <ConfigButton
          text="Médio"
          @click="changeDifficulty('medium')"
          :selected="difficulty === 'medium'"
          mode="outline"
        />
        <ConfigButton
          text="Difícil"
          @click="changeDifficulty('hard')"
          :selected="difficulty === 'hard'"
          mode="outline"
        />
      </div>
    </div>
    <div class="w-full text-center">
      <button
        class="w-1/2 h-12 border border-orange-400 bg-orange-400 text-2xl text-white rounded-xl cursor-pointer transition-all duration-200 hover:bg-white hover:text-orange-400"
        @click="start"
      >
        Jogar
      </button>
    </div>
  </div>
</template>
