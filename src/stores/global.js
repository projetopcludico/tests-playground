import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAplicationStore = defineStore('aplicationStore', () => {

  const aplication = ref({
    themes: {
      forms: {
        countResponses: 0,
        simbols: [
          { id: 1, name: 'circle', icon: 'mdi mdi-circle-outline' },
          { id: 2, name: 'rectangle', icon: 'mdi mdi-rectangle-outline' },
          { id: 3, name: 'pentagon', icon: 'mdi mdi-pentagon-outline' },
          { id: 4, name: 'triangle', icon: 'mdi mdi-triangle-outline' },
          { id: 5, name: 'square', icon: 'mdi mdi-square-outline' },
        ],
        difficulties: {
          easy: {
            timeLimit: 30000,
            params: { numberForms: 2, size: 6, discovers: 1, objectiveResponses: 10 },
          },
          medim: {
            timeLimit: 30000,
            params: { numberForms: 2, size: 12, discovers: 2, objectiveResponses: 7 },
          },
          hard: {
            timeLimit: 30000,
            params: { numberForms: 3, size: 18, discovers: 3, objectiveResponses: 4 },
          },
        },
      },
    },
  });

  return{
    aplication
  }
})
