import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'

const SOUND_OBJECTS = Object.freeze([
  { id: 1, path: '/sounds/grass.mp3', name: 'som de grama', color: 'blue' },
  { id: 2, path: '/sounds/metal.mp3', name: 'som de metal', color: 'green' },
  { id: 3, path: '/sounds/plastic.mp3', name: 'som de plástico', color: 'red' },
  { id: 4, path: '/sounds/water.mp3', name: 'som de água', color: 'gray' },
  { id: 5, path: '/sounds/wind.mp3', name: 'som de vento', color: 'brown' },
  { id: 6, path: '/sounds/wood.mp3', name: 'som de madeira', color: 'yellow' },
])

const SOUND_DIFFICULTIES = Object.freeze({
  easy: Object.freeze({
    id: 1,
    title: 'Fácil',
    description:
      'Você terá 1 minuto e 30 segundos para adivinhar o som que falta na sequência, clique no som que você queira descobrir e responda até acertar todos os 5 padrões',
    howToUse:
      'Na sequência abaixo das opções de resposta você terá um padrão de repetições de 3 sons diferentes, você terá que descobrir o único som que está faltando e que possui um ? e é indicado pelo som semelhante à uma notificação. Selecione ele e responda com as opções que estão abaixo.',
    params: Object.freeze({
      difficulty: 'easy',
      numberSounds: 3,
      size: 9,
      discover: 1,
      timeLimit: 90,
    }),
  }),
  medium: Object.freeze({
    id: 2,
    title: 'Médio',
    description:
      'Você terá 1 minuto e 30 segundos para adivinhar os 2 sons que faltam na sequência, clique no som que você queira descobrir e responda até acertar todos os 5 padrões',
    howToUse:
      'Na sequência abaixo das opções de resposta você terá um padrão de repetições de 4 sons diferentes, você terá que descobrir os 2 sons que estão faltando, que possuem um ícone ? e são indicados pelo som semelhante à uma notificação. Selecione qual você quer e responda com as opções que estão abaixo.',
    params: Object.freeze({
      difficulty: 'medium',
      numberSounds: 4,
      size: 12,
      discover: 2,
      timeLimit: 90,
    }),
  }),
  hard: Object.freeze({
    id: 3,
    title: 'Difícil',
    description:
      'Você terá 2 minutos e 30 segundos para adivinhar os 3 sons que faltam na sequência, clique no som que você queira descobrir e responda até acertar todos os 5 padrões',
    howToUse:
      'Na sequência abaixo das opções de resposta você terá um padrão de repetições de 5 sons diferentes, você terá que descobrir os 3 sons que estão faltando, que possuem um ícone ? e são indicados pelo som semelhante à uma notificação. Selecione qual você quer e responda com as opções que estão abaixo.',
    params: Object.freeze({
      difficulty: 'hard',
      numberSounds: 5,
      size: 15,
      discover: 3,
      timeLimit: 150,
    }),
  }),
})

const NUMBER_DIFFICULTIES = Object.freeze({
  easy: Object.freeze({
    id: 1,
    title: 'Fácil',
    params: Object.freeze({
      difficulty: 'easy',
      length: 6,
      amountOperations: 2,
      maxOperator: 3,
      maxStart: 5,
      numberDiscover: 1,
      timeLimit: 90
    }),
  }),
  medium: Object.freeze({
    id: 2,
    title: 'Médio',
    params: Object.freeze({
      difficulty: 'medium',
      length: 8,
      amountOperations: 3,
      maxOperator: 5,
      maxStart: 10,
      numberDiscover: 2,
      timeLimit: 120
    }),
  }),
  hard: Object.freeze({
    id: 3,
    title: 'Difícil',
    params: Object.freeze({
      difficulty: 'hard',
      length: 10,
      amountOperations: 4,
      maxOperator: 9,
      maxStart: 20,
      numberDiscover: 3,
      timeLimit: 150
    }),
  }),
})

const FORM_SYMBOLS = Object.freeze([
  { id: 1, name: 'Abutre', icon: '/images/icons/abutre.svg', color: '#FF6357', background: '#FF9E97' },
  { id: 2, name: 'Vaso Canopo', icon: '/images/icons/canopo.svg', color: '#87CE57', background: '#BFFF95' },
  { id: 3, name: 'Egípcio', icon: '/images//icons/egipcio.svg', color: '#AC37FF', background: '#D599FF' },
  { id: 4, name: 'Esfinge', icon: '/images//icons/esfinge.svg', color: '#D5C359', background: '#FBE97D' },
  { id: 5, name: 'Pilo', icon: '/images//icons/pilo.svg', color: '#44BBFF', background: '#A0DCFF' },
])

const FORM_DIFFICULTIES = Object.freeze({
  easy: Object.freeze({
    id: 1,
    title: 'Fácil',
    timeLimit: 90,
    params: Object.freeze({ difficulty: 'easy', numberForms: 2, size: 6, discovers: 1 }),
  }),
  medium: Object.freeze({
    id: 2,
    title: 'Médio',
    timeLimit: 90,
    params: Object.freeze({ difficulty: 'medium', numberForms: 2, size: 12, discovers: 2 }),
  }),
  hard: Object.freeze({
    id: 3,
    title: 'Difícil',
    timeLimit: 90,
    params: Object.freeze({ difficulty: 'hard', numberForms: 3, size: 18, discovers: 3 }),
  }),
})

const REQUIRED_RESPONSES = Object.freeze({ sounds: 5, numbers: 5, forms: 5 })

const GAME_FLOW = [
  Object.freeze({ mode: 'forms', route: '/forms/:difficulty' }),
  Object.freeze({ mode: 'sounds', route: '/sounds/:difficulty' }),
  Object.freeze({ mode: 'numbers', route: '/numbers/:difficulty' }),
]

export const useApplicationStore = defineStore('applicationStore', () => {
  const soundResponses = ref(0)
  const numberResponses = ref(0)
  const formResponses = ref(0)

  const soundProgress = computed(() => `${soundResponses.value}/${REQUIRED_RESPONSES.sounds}`)

  const numberProgress = computed(() => `${numberResponses.value}/${REQUIRED_RESPONSES.numbers}`)

  const formProgress = computed(() => `${formResponses.value}/${REQUIRED_RESPONSES.forms}`)

  const isSoundGoalReached = computed(() => soundResponses.value >= REQUIRED_RESPONSES.sounds)

  const isNumberGoalReached = computed(() => numberResponses.value >= REQUIRED_RESPONSES.numbers)

  const isFormGoalReached = computed(() => formResponses.value >= REQUIRED_RESPONSES.forms)

  function incrementSoundResponses() {
    soundResponses.value++
  }
  function incrementNumberResponses() {
    numberResponses.value++
  }
  function incrementFormResponses() {
    formResponses.value++
  }

  function resetSoundResponses() {
    soundResponses.value = 0
  }
  function resetNumberResponses() {
    numberResponses.value = 0
  }
  function resetFormResponses() {
    formResponses.value = 0
  }

  function getNextRoute({ mode, difficulty, success }) {
    if (!success) {
      return {
        name: `${mode}-view`,
        params: { difficulty },
      }
    }

    const difficultiesOrder = ['easy', 'medium', 'hard']
    const currentDifficultyIndex = difficultiesOrder.indexOf(difficulty)

    if (currentDifficultyIndex < difficultiesOrder.length - 1) {
      return {
        name: `${mode}-view`,
        params: { difficulty: difficultiesOrder[currentDifficultyIndex + 1] },
      }
    }

    const currentModeIndex = GAME_FLOW.findIndex((g) => g.mode === mode)

    if (currentModeIndex < GAME_FLOW.length - 1) {
      return {
        name: `${GAME_FLOW[currentModeIndex + 1].mode}-view`,
        params: {
          difficulty: 'easy',
        },
      }
    }

    return { name: 'home-view' }
  }

  function repeatLevelRoute({ mode, difficulty }) {
    return {
      name: `${mode}-view`,
      params: { difficulty },
    }
  }

  return {
    // Estado
    soundResponses,
    numberResponses,
    formResponses,

    // Dados estáticos expostos via readonly (sem custo reativo)
    soundObjects: readonly(SOUND_OBJECTS),
    soundDifficulties: readonly(SOUND_DIFFICULTIES),
    numberDifficulties: readonly(NUMBER_DIFFICULTIES),
    formSymbols: readonly(FORM_SYMBOLS),
    formDifficulties: readonly(FORM_DIFFICULTIES),
    requiredResponses: readonly(REQUIRED_RESPONSES),

    // Getters
    soundProgress,
    numberProgress,
    formProgress,
    isSoundGoalReached,
    isNumberGoalReached,
    isFormGoalReached,

    // Actions
    incrementSoundResponses,
    incrementNumberResponses,
    incrementFormResponses,
    resetSoundResponses,
    resetNumberResponses,
    resetFormResponses,
    getNextRoute,
    repeatLevelRoute
  }
})
