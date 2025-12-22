import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const useAudioStore = defineStore('audioStore', () => {

    const state = reactive({
        currentSequence: null,
        sound: new Audio(),
    });

    const sound = computed(() => state.sound);

    const playAudio = (path) => {
        if(state.currentSequence) {
            state.currentSequence = null
        }

        state.sound.src = path
        state.sound.play();
    }

    const playSequence = (sequence) => {
        if(state.currentSequence) state.currentSequence = null

        state.currentSequence = sequence;
        let index = 0;

        const playNext = () => {

            if(index >= state.currentSequence.length) return;

            if(state.currentSequence[index].object.path == '') {
                index++;
                setTimeout( playNext, 1000 );
                return
            }

            state.sound.src = state.currentSequence[index].object.path
            state.sound.play();

            state.sound.onended = () => {
                index++;
                playNext();
            }

        }

        playNext();

    }

    return{
        playAudio,
        playSequence,
        sound
    }

})