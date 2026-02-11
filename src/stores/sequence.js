import { defineStore } from 'pinia'
import { ref } from 'vue'
import sortObjects from '../tools/sort'
import getRandomIndexes from '../tools/getRandomIndexes'
import shuffle from '../tools/shuffle'

export const useSequenceStore = defineStore('sequenceStore', () => {
  const sequence = ref([])
  const correctResponses = ref([])
  const responses = ref([])
  const finalChoices = ref([])
  const selectedObjectId = ref(0)
  
  const expectedResponses = ref(0);

  function mountSequence(numberItens, sequenceLength, numberDiscover, arrayToSort) {
    const itensSequence = sortObjects(numberItens, arrayToSort);
    const functionSequence = []
    let idSequence = 0

    for (let count = 0; count < sequenceLength / itensSequence.length; count++) {
      for (let item of itensSequence) {
        idSequence++
        functionSequence.push({
          id: idSequence,
          object: { ...item },
        })
      }
    }

    const randomIndexes = getRandomIndexes(functionSequence.length, numberDiscover).sort(
      (a, b) => a - b,
    )

    const functionCorrectResponses = Array(functionSequence.length).fill(null)

    for (const index of randomIndexes) {
      const chosen = functionSequence[index]
      functionCorrectResponses[index] = chosen.object.id

      functionSequence[index].object.icon = 'mdi mdi-help'
      functionSequence[index].object.name = 'discover'

      if (functionSequence[index].object.path) {
        functionSequence[index].object.path = '/sounds/discover.mp3'
      }
    }

    const options = shuffle(itensSequence)

    const seen = new Set();
    const functionFinalChoices = options.filter((opt) => {
      if (seen.has(opt.id)) return false;
      seen.add(opt.id);
      return true;
    })

    sequence.value = functionSequence;
    correctResponses.value = functionCorrectResponses;
    finalChoices.value = functionFinalChoices;
    selectedObjectId.value = null;
    responses.value = [];
    expectedResponses.value = numberDiscover
  }

  function selectObjectId(id) {
    selectedObjectId.value = id
  }

  function respond(sequenceId, callBack) {
    if(correctResponses.value[sequenceId] === selectedObjectId.value) {
        responses.value.push(selectedObjectId.value)
        console.log('Correto');
    } else {
        console.error('Errado')
    }

    if(responses.value.length === expectedResponses.value) {
        if(typeof callBack === 'function'){
            callBack();
        } else {
            console.error("O parâmetro callBack precisa ser uma função")
        }
    } 
  }

  return {
    sequence,
    correctResponses,
    responses,
    finalChoices,
    selectedObjectId,
    mountSequence,
    selectObjectId,
    respond,
  }
})
