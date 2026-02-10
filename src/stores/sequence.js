import { defineStore } from "pinia";
import { ref } from "vue";
import sortObjects from "../tools/sort";
import getRandomIndexes from "../tools/getRandomIndexes";
import shuffle from "../tools/shuffle";

export const useSequenceStore = defineStore('sequenceStore', () => {

    const sequenceState = ref([]);
    const correctResponses = ref([]);
    const responses = ref([]);
    const finalChoices = ref([]);
    const selectedIndex = ref(null);

    async function mountSequence(numberItens, timesRepeat, numberDiscover, arrayToSort) {
        
        const itensSequence = sortObjects(numberItens, arrayToSort);
        const sequence = [];
        let idSequence = 0;

        for(let count = 0; count < timesRepeat / itensSequence.length; count++) {
            for(let item of itensSequence) {
                idSequence++
                sequence.push({
                    id: idSequence,
                    object: { ...item }
                });
            }
        }

        sequenceState.value = sequence

    }
    
}); 