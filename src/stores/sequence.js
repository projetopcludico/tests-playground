import { defineStore } from 'pinia'
import sortObjects from '../tools/sort'

function getRandomIndexes(max, count) {
  const indexes = new Set()
  while (indexes.size < count) {
    indexes.add(Math.floor(Math.random() * max))
  }
  return Array.from(indexes)
}

function shuffle(optionsArray) {
  const list = [...optionsArray]
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[list[i], list[j]] = [list[j], list[i]]
  }
  return list
}

export const useSequenceStore = defineStore('sequence', {
  state: () => ({
    sequence: [],
    // correctResponses é um array de ids. A posição (index) equivale à posição na sequence.
    correctResponses: [],
    finalChoices: [],
    selectedIndex: null
  }),

  actions: {
    mountSequence(numberItens, timesRepeat, numberDiscover, arrayToSort) {
      const itenSequence = sortObjects(numberItens, arrayToSort)
      const sequence = []
      let idSequence = 0

      for (let count = 0; count < timesRepeat / itenSequence.length; count++) {
        for (let item of itenSequence) {
          idSequence++
          sequence.push({
            id: idSequence,
            object: { ...item } // item deve conter .id, .name, .icon
          })
        }
      }

      const discoverCount = Math.min(numberDiscover, sequence.length)
      const randomIndexes = getRandomIndexes(sequence.length, discoverCount).sort((a, b) => a - b)
      const correctResponses = []

      for (const index of randomIndexes) {
        const chosen = sequence[index]
        // guarda o id correto na posição `index`
        correctResponses[index] = chosen.object.id

        sequence[index].object.icon = 'mdi mdi-help-box'
        sequence[index].object.name = 'discover'
      }

      const options = shuffle(itenSequence)
      // finalChoices como array de objetos (únicos por id)
      // se quiser garantir unicidade por id:
      const seen = new Set()
      const finalChoices = options.filter(opt => {
        if (seen.has(opt.id)) return false
        seen.add(opt.id)
        return true
      })

      this.sequence = sequence
      this.correctResponses = correctResponses
      this.finalChoices = finalChoices
      this.selectedIndex = null
    },

    selectDiscover(index) {
      const item = this.sequence[index]
      if (item && item.object.name === 'discover') {
        this.selectedIndex = index
      }
    },

    // altera o item da sequência no índice informado
    revealChoice(index, chosenObject) {
      const item = this.sequence[index]
      if (item && item.object.name === 'discover') {
        // substitui pelo objeto escolhido (incluindo id)
        item.object = { ...chosenObject }
      }
    }
  }
})
