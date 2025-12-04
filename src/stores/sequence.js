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
      const correctResponses = Array(sequence.length).fill(null)

      for (const index of randomIndexes) {
        const chosen = sequence[index]
        correctResponses[index] = chosen.object.id

        sequence[index].object.icon = 'mdi mdi-help-box'
        sequence[index].object.name = 'discover'

        if(sequence[index].object.path) {
          sequence[index].object.path = ''
        }
      }

      const options = shuffle(itenSequence)

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

    revealChoice(index, chosenObject) {
      const item = this.sequence[index]
      if (item && item.object.name === 'discover') {
        item.object = { ...chosenObject }
      }
    }
  }
})