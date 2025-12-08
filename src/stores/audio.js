import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAudioStore = defineStore('audioStore', () => {

    const state = reactive({
        currentAudio: null,
        currentSequence: null,
        sound: new Audio(),
    });

    const playAudio = (path) => {
        if(state.currentAudio) state.currentAudio = null;

        state.sound.src = path
        state.sound.play();
    }

    const playSequence = (sequence) => {
        
        if(state.currentSequence) state.currentSequence = null

        state.currentSequence = sequence;
        let index = 0;

        const playNext = () => {

            if(index >= sequence.length) return;

            if(sequence[index].object.path == '') {
                index++;
                setTimeout( playNext, 1000 );
                return
            }

            const audio = new Audio(sequence[index].object.path);
            audio.play();

            audio.addEventListener('ended', () => {
                index++;
                playNext();
            });

        }

        playNext();

    }

    return{
        playAudio,
        playSequence
    }

})