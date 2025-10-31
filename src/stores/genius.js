import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import verifyResponse from '../tools/verifyResponse';

export const useGeniuStore = defineStore('geniusStore', () => {
    const state = reactive({
        sequenceGenius: [],
        sequenceResponse: [],
        corrects: 0,
        isPlaying: false
    });

    const startGenius = () => {
        
    }

    const respond = async(id) => {
        if(state.isPlaying) return
        state.sequenceResponse.push(id);

    }

    const playAudio = (path) => {
        const audio = new Audio(path);
        audio.play();
    }

    

    const sequenceGenius = computed(() => sequenceGenius.value);
    const sequenceResponse = computed(() => sequenceResponse.value);

    return {
        sequenceGenius,
        sequenceResponse,
        respond,
        playAudio
    }
})
