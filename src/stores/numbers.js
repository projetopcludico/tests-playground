import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAplicationStore } from './aplication';
import { shuffle } from '../utils/shuffle';
import { useSortOperation, executeOperation } from '../utils/operation';

export const useNumberStore = defineStore('numberStore', () => {
  const aplicationStore = useAplicationStore();

  const dificulty = ref("");
  const visibleSequence = ref([]);
  const correctNumber = ref(null);
  const options = ref([]);

  function generateSequence(length, amountOperations, maxOperator, maxStart, levelDificulty) {
    if(length <= amountOperations ) {
      console.error(`O tamanho de sequencia de números: ${length} deve ser maior do que a quantidade de operações: ${amountOperations}`);
      return
    }

    dificulty.value = levelDificulty;
    const startNumber = Math.floor(Math.random() * maxStart) + 1;
    const sequence = [startNumber];
    const { exportedOperations, operators } = useSortOperation(amountOperations, maxOperator);
    if(!exportedOperations.length) {
      console.error("Nenhuma operação foi gerada.");
      return;
    }
    let currentOperationIndex = 0;

    while(sequence.length <= length) {
      if(currentOperationIndex >= exportedOperations.length) currentOperationIndex = 0;
      
      sequence.push(
        executeOperation(
          exportedOperations[currentOperationIndex],
          sequence[sequence.length - 1],
          operators[currentOperationIndex]
        ) 
      );

      currentOperationIndex++;
    }

    const correct = sequence.splice(sequence.length -1, 1)[0];

    visibleSequence.value = sequence;
    correctNumber.value = correct;
    generateAlternatives();
  }

  function generateAlternatives() {
    const correct = correctNumber.value
    const alternatives = new Set([correct]);
    const maxIterations = 100;
    let iterations = 0;

    while (alternatives.size < 5 && iterations < maxIterations) {
      const offset = Math.floor(Math.random() * 5) - 2
      const candidate = correct + offset

      if (candidate > 0) {
        alternatives.add(candidate)
      }
      iterations++;
    }

    if (iterations >= maxIterations) {
      console.warn('generateAlternatives: max iterations reached, adding fallback numbers');
      let fallback = correct + 10;
      while (alternatives.size < 5) {
        alternatives.add(fallback++);
      }
    }

    options.value = shuffle([...alternatives])
  }

  function checkAnswer(num) {

    if(num === correctNumber.value) {
      aplicationStore.aplication.themes.numbers.countResponses++;
      return true
    };
    return false
  }

  return {
    visibleSequence,
    dificulty,
    correctNumber,
    options,
    generateSequence,
    checkAnswer
  }

})
