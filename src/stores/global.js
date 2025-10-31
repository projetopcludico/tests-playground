import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAplicationStore = defineStore('aplicationStore', () => {
  const router = useRouter();

  const aplication = ref({
    themes: {

      forms: {
        simbols: [
          { id: 1, name: 'circle', icon: 'mdi mdi-circle-outline' },
          { id: 2, name: 'rectangle', icon: 'mdi mdi-rectangle-outline' },
          { id: 3, name: 'pentagon', icon: 'mdi mdi-pentagon-outline' },
          { id: 4, name: 'triangle', icon: 'mdi mdi-triangle-outline' },
          { id: 5, name: 'square', icon: 'mdi mdi-square-outline' },
        ],
        difficulties: {
          easy: {
            objective: 10,
            timeLimit: 30000,
            params: { numberForms: 2, size: 6, discovers: 1 },
          },
          medim: {
            objective: 7,
            timeLimit: 30000,
            params: { numberForms: 2, size: 12, discovers: 2 },
          },
          hard: {
            objective: 4,
            timeLimit: 30000, 
            params: { numberForms: 3, size: 18, discovers: 3 },
          },
        },
      },
    },
    
    sounds:{
        objects: [
            {id: 1, path: '/sounds/C4.mp3', name: 'Dó', color: 'blue'},
            {id: 2, path: '/sounds/D4.mp3', name: 'Ré', color: 'green'},
            {id: 3, path: '/sounds/E4.mp3', name: 'Mi', color: 'red'},
            {id: 4, path: '/sounds/F4.mp3', name: 'Fá', color: 'pink'},
            {id: 5, path: '/sounds/G4.mp3', name: 'Sol', color: 'brown'},
            {id: 6, path: '/sounds/A4.mp3', name: 'Lá', color: 'yellow'},
            {id: 7, path: '/sounds/B4.mp3', name: 'Si', color: 'purple'},
        ]
    }
  });

  return{
    aplication
  }
})