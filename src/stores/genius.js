import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useGeniuStore = defineStore('geniusStore', () => {
    const state = reactive({
        sequenceGenius: [],
        sequenceResponse: []
    });

    const respond = () => {
        
    }

    const compareResponse = () => {

    }

    const sequenceGenius = computed(() => sequenceGenius.value);
    const sequenceResponse = computed(() => sequenceResponse.value);

    return {
        sequenceGenius,
        sequenceResponse,
        respond,
        compareResponse
    }
})
