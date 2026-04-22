import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApplicationStore } from './application'
import shuffle from '@/utils/shuffle'
import { useSortOperation, executeOperation } from '@/utils/operation'
import sortObjects from '@/utils/sort'
import verifyResponse from '@/utils/verifyResponse'

function getRandomIndexes(max, count) {
  const possible = Array.from({ length: max }, (_, i) => i).filter((i) => i !== 0)
  return shuffle(possible)
    .slice(0, count)
    .sort((a, b) => a - b)
}

function buildNumberAlternatives(correct, total = 5) {
  const alternatives = new Set([correct])
  let iterations = 0
  const MAX_ITER = 100

  while (alternatives.size < total && iterations < MAX_ITER) {
    const offset = Math.floor(Math.random() * 5) - 2
    const candidate = correct + offset
    if (candidate > 0) alternatives.add(candidate)
    iterations++
  }

  if (iterations >= MAX_ITER) {
    console.warn('[sequence] buildNumberAlternatives: usando fallback numérico')
    let fallback = correct + 10
    while (alternatives.size < total) alternatives.add(fallback++)
  }

  return shuffle([...alternatives])
}

export const useSequenceStore = defineStore('sequence', () => {
  const applicationStore = useApplicationStore()

  const sequence = ref([])
  const correctResponses = ref([])
  const responses = ref([])
  const finalChoices = ref([])
  const selectedChoice = ref(null)

  const difficulty = ref('')
  const visibleSequence = ref([])
  const correctNumber = ref(null)
  const numberOptions = ref([])

  const pendingCount = computed(() => correctResponses.value.filter((id) => id !== null).length)

  const isObjectSequenceComplete = computed(() => responses.value.length === pendingCount.value)

  /**
   * Monta uma sequência de objetos (formas ou sons) com lacunas a descobrir.
   *
   * @param {number} numberItems   - Quantos itens distintos compõem o padrão
   * @param {number} timesRepeat   - Tamanho total desejado da sequência
   * @param {number} numberDiscover - Quantas posições serão ocultadas
   * @param {Array}  pool          - Array de objetos disponíveis para sortear
   */
  function mountObjectSequence(numberItems, timesRepeat, numberDiscover, pool) {
    const itemSequence = sortObjects(numberItems, pool)
    const built = []
    let idSequence = 0

    const cycles = Math.floor(timesRepeat / itemSequence.length)
    for (let c = 0; c < cycles; c++) {
      for (const item of itemSequence) {
        built.push({ id: ++idSequence, object: { ...item } })
      }
    }

    const discoverCount = Math.min(numberDiscover, built.length)
    const randomIndexes = getRandomIndexes(built.length, discoverCount)
    const correct = Array(built.length).fill(null)

    for (const idx of randomIndexes) {
      correct[idx] = built[idx].object.id
      built[idx].object.icon = 'mdi mdi-help'
      built[idx].object.name = 'discover'
      if (built[idx].object.path) {
        built[idx].object.path = '/sounds/discover.mp3'
      }
    }

    const uniqueIds = new Set()
    const choices = shuffle(itemSequence).filter(({ id }) => {
      if (uniqueIds.has(id)) return false
      uniqueIds.add(id)
      return true
    })

    sequence.value = built
    correctResponses.value = correct
    finalChoices.value = choices
    responses.value = []
    selectedChoice.value = null
  }

  function selectChoice(choiceObject) {
    if (selectedChoice.value?.id === choiceObject.id) {
      selectedChoice.value = null
    } else {
      selectedChoice.value = { ...choiceObject }
    }
  }

  function revealChoice(index, chosenObject) {
    if (sequence.value[index]?.object.name === 'discover') {
      sequence.value[index].object = { ...chosenObject }
    }
  }

  function answerObjectSequence(discoverIndex, theme, fallBack) {
    if (selectedChoice.value === null) return 'noop'
    if (typeof fallBack !== 'function') {
      console.error('fallBack não é uma função')
      return 'noop'
    }

    const item = sequence.value[discoverIndex]
    if (!item || item.object.name !== 'discover') return 'noop'

    const expected = correctResponses.value[discoverIndex]
    if (expected === undefined) {
      console.warn('[sequence] Posição sem resposta registrada:', discoverIndex)
      return 'noop'
    }

    if (expected !== selectedChoice.value.id) {
      selectedChoice.value = null
      return 'wrong'
    }

    responses.value.push({ index: discoverIndex, id: selectedChoice.value.id })
    revealChoice(discoverIndex, selectedChoice.value)

    if (isObjectSequenceComplete.value && verifyResponse(responses.value, correctResponses.value)) {
      if (theme === 'sounds') applicationStore.incrementSoundResponses()
      else if (theme === 'forms') applicationStore.incrementFormResponses()
      else if (theme === 'numbers') applicationStore.incrementNumberResponses()

      if (fallBack) {
        fallBack()
      }
    }

    return 'correct'
  }

  /**
   * Gera uma sequência numérica baseada em operações matemáticas aleatórias.
   * O último número é removido da sequência visível e torna-se a resposta correta.
   *
   * @param {number} length           - Quantidade de números visíveis
   * @param {number} amountOperations - Quantidade de operações distintas no padrão
   * @param {number} maxOperator      - Valor máximo do operando
   * @param {number} maxStart         - Valor máximo do número inicial
   */
  function generateNumberSequence(
    length,
    amountOperations,
    maxOperator,
    maxStart,
    numberDiscover,
  ) {
    if (length <= amountOperations) {
      console.error(
        `[sequence] Tamanho da sequência (${length}) deve ser maior que o nº de operações (${amountOperations})`,
      )
      return
    }

    const { exportedOperations, operators } = useSortOperation(amountOperations, maxOperator)
    if (!exportedOperations.length) {
      console.error('[sequence] Nenhuma operação foi gerada.')
      return
    }

    const startNumber = Math.floor(Math.random() * maxStart) + 1
    const rawSeq = [startNumber]
    let opIndex = 0

    while (rawSeq.length <= length) {
      if (opIndex >= exportedOperations.length) opIndex = 0
      rawSeq.push(executeOperation(exportedOperations[opIndex], rawSeq.at(-1), operators[opIndex]))
      opIndex++
    }

    const built = rawSeq.map((value, i) => ({
      id: i + 1,
      object: { id: i + 1, value, name: 'number' },
    }))

    const discoverCount = Math.min(numberDiscover, built.length)
    const randomIndexes = getRandomIndexes(built.length, discoverCount)
    const correct = Array(built.length).fill(null)

    for (const idx of randomIndexes) {
      correct[idx] = built[idx].object.id
      built[idx].object = {
        ...built[idx].object,
        name: 'discover',
        icon: 'mdi mdi-help',
      }
    }

    const correctValues = new Set(randomIndexes.map((idx) => rawSeq[idx]))
    let choices = randomIndexes.map((idx) => ({
      id: built[idx].object.id,
      value: rawSeq[idx],
      name: 'number',
    }))

    const visibleIndexes = built.map((_, i) => i).filter((i) => !randomIndexes.includes(i))

    for (const i of shuffle(visibleIndexes)) {
      if (choices.length >= numberDiscover + 3) break
      const val = rawSeq[i]
      if (!correctValues.has(val)) {
        choices.push({ id: built[i].object.id, value: val, name: 'number' })
        correctValues.add(val)
      }
    }

    sequence.value = built
    correctResponses.value = correct
    finalChoices.value = shuffle(choices)
    responses.value = []
    selectedChoice.value = null

    console.log({
      numberDiscover,
      discoverCount,
      randomIndexes,
    })
  }

  return {
    // Estado — objetos
    sequence,
    correctResponses,
    responses,
    finalChoices,
    selectedChoice,

    // Estado — números
    difficulty,
    visibleSequence,
    correctNumber,
    numberOptions,

    // Getters
    pendingCount,
    isObjectSequenceComplete,

    // Actions — objetos
    mountObjectSequence,
    selectChoice,
    revealChoice,
    answerObjectSequence,

    // Actions — números
    generateNumberSequence,
  }
})
