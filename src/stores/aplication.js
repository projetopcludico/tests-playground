import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAplicationStore = defineStore('aplicationStore', () => {
  const router = useRouter();

  const aplication = ref({
    themes: {
      sounds: {
        required: 5,
        countResponses: 5,
        objects: [
            {id: 1, path: '/sounds/grass.mp3', name: 'som de grama', color: 'blue'},
            {id: 2, path: '/sounds/metal.mp3', name: 'som de metal', color: 'green'},
            {id: 3, path: '/sounds/plastic.mp3', name: 'som de plástico', color: 'red'},
            {id: 4, path: '/sounds/water.mp3', name: 'som de água', color: 'gray'},
            {id: 5, path: '/sounds/wind.mp3', name: 'som de vento', color: 'brown'},
            {id: 6, path: '/sounds/wood.mp3', name: 'som de madeira', color: 'yellow'},
        ],
        difficulties: {
            easy:{
                id: 1,
                title: "Fácil",
                description: "Você terá 1 minuto e 30 segundos para adivinhar o som que falta na sequência, clique no som que você queira descobrir e responda até acertar todos os 5 padrões",
                howToUse: "Na sequência abaixo das opções de resposta você terá um padrão de repetições de 3 sons diferentes, você terá que descobrir o único som que está faltando e que possui um ? e é indicado pelo som semelhante à uma notificação. Selecione ele e responda com as opções que estão abaixo.",
                params: {
                    dificulty: 'easy', 
                    numberSounds: 3, 
                    size: 9, 
                    discover: 1, 
                    timeLimit: 90, 
                }
            },
            medium: {
                id: 2,
                title: "Médio",
                description: "Você terá 1 minuto e 30 segundos para adivinhar os 2 sons que faltam na sequência, clique no som que você queira descobrir e responda até acertar todos os 5 padrões",
                howToUse: "Na sequência abaixo das opções de resposta você terá um padrão de repetições de 4 sons diferentes, você terá que descobrir os 2 sons que estão faltando, que possuem um ícone ? e são indicados pelo som semelhante à uma notificação. Selecione qual você quer e responda com as opções que estão abaixo.",
                params: {
                    dificulty: 'medium', 
                    numberSounds: 4, 
                    size: 12, 
                    discover: 2, 
                    timeLimit: 90, 
                }
            },
            hard: {
                id: 3,
                title: "Difícil",
                description: "Você terá 2 minutos e 30 segundos para adivinhar os 3 sons que faltam na sequência, clique no som que você queira descobrir e responda até acertar todos os 5 padrões",
                howToUse: "Na sequência abaixo das opções de resposta você terá um padrão de repetições de 5 sons diferentes, você terá que descobrir os 3 sons que estão faltando, que possuem um ícone ? e são indicados pelo som semelhante à uma notificação. Selecione qual você quer e responda com as opções que estão abaixo.",
                params: {
                    dificulty: 'hard',
                    numberSounds: 5, 
                    size: 15, 
                    discover: 3, 
                    timeLimit: 150, 
                }
            }
        }
      }
    },
  });

  return{
    aplication
  }
})