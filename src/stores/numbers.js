import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAplicationStore } from './aplication';

export const useNumberStore = defineStore('numberStore', () => {
  const fullSequence = ref([])
  const hiddenIndex = ref(0)

  const patternType = ref('progressao')
  const patternValue = ref(1)

  const options = ref([])
  const correctIndex = ref(null)
  const selectedNumber = ref(null);

  const visibleSequence = computed(() => fullSequence.value.slice(0, hiddenIndex.value))
  const correctAnswer = computed(() => fullSequence.value[hiddenIndex.value]);
  

  function generateSequence(length) {
    const start = Math.floor(Math.random() * 5) + 1

    switch (patternType.value) {
      case 'progressao':
        fullSequence.value = Array.from({ length }, (_, i) => {
          return start + i * patternValue.value
        })
        break;

      case 'multiplicacao':
        fullSequence.value = Array.from({ length }, (_, i) => {
          return start * Math.pow(patternValue.value, i)
        })
        break;

      case 'alternado':
        fullSequence.value = Array.from({ length }, (_, i) => {
          return i % 2 === 0 ? start : start + patternValue.value
        })
        break;

      case 'fibonacci': 
        const sequence = [];

        for(let cont = 0;cont < length; cont++) {
          if(cont === 0) {
            sequence.push(start);
          } 
          else if(cont === 1) {
            sequence.push(start + 1);
          } 
          else {
            sequence.push(sequence[cont - 1] + sequence[cont - 2]);
          }
        }

        fullSequence.value = sequence;
        break;
    }

    hiddenIndex.value = length - 1
    generateAlternatives()
  }

  function randomPattern() {
    const patterns = ['progressao', 'alternado', 'multiplicacao', 'fibonacci'];
    return patterns[Math.floor(Math.random() * patterns.length)]
  }

  function newRound(length = 5) {
    patternType.value = randomPattern()
    patternValue.value = Math.floor(Math.random() * 4) + 1
    if(patternValue.value <= 1) newRound(length);
    
    generateSequence(length);
  }

  function generateAlternatives() {
    const correct = correctAnswer.value
    const alternatives = new Set([correct])

    while (alternatives.size < 4) {
      const offset = Math.floor(Math.random() * 5) - 2
      const candidate = correct + offset

      if (candidate > 0) {
        alternatives.add(candidate)
      }
    }

    options.value = shuffle([...alternatives])
    correctIndex.value = options.value.indexOf(correct)
  }

  function shuffle(array) {
    return array
      .map(v => ({ v, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map(o => o.v)
  }

  function selectNumber(num) {
    selectedNumber.value = num
  }

  function checkAnswer(index) {
    const aplicationStore = useAplicationStore();
    if(index === correctIndex.value) {
      aplicationStore.aplication.themes.numbers.countResponses++
      newRound(10);
    }
  }

  return {
    visibleSequence,
    options,
    patternType,
    selectNumber,
    checkAnswer,
    newRound,
  }
})
