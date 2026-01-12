import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNumberStore = defineStore('numberStore', () => {

    const fullSequence = ref([]);
    const hiddenIndex = ref(0);
    const patternType = ref('progressao');
    const patternValue = ref(1);


    const visibleSequence = computed(() => fullSequence.value.slice(0, hiddenIndex.value));
    const correctAnswer = computed(() => fullSequence.value[hiddenIndex.value]);

    function generateSequence(length = 5) {
        const start = Math.floor(Math.random() * 5) + 1;

        switch (patternType.value) {

            case 'progressao':
                fullSequence.value = Array.from({ length }, (_, i) => {
                    return start + i * patternValue.value
                });
                break;
            
            case 'multiplicacao':
                fullSequence.value = Array.from({ length }, (_, i) => {
                    return start * Math.pow(patternValue.value, i);
                });
                break;

            case 'alternado':
                fullSequence.value = Array.from({ length }, (_, i) => {
                    return i % 2 === 0 ? start : start + patternValue.value
                });
                break;
                
        }

        hiddenIndex.value = length - 1;
    }

    function randomPattern() {
        const patterns = ['progressao', 'alternado', 'multiplicacao'];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    function newRound() {
        patternType.value = randomPattern();
        patternValue.value = Math.floor(Math.random() * 4) + 1; 
        // Aqui poderíamos encaixar as dificuldades, no lugar do 4 fixo que está multiplicando o Math.random()
        generateSequence()
    }

    function checkAnswer(value) {
        return value = correctAnswer.value;
    }

    return {
        visibleSequence,
        patternType,
        checkAnswer,
        newRound,
    }

})
