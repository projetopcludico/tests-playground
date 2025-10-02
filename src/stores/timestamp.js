import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useTimeStamp = defineStore('timeStamp', () => {

    const initialTime = ref(null);
    const decorentTime = ref(0);
    let intervalId = null

    function start(){
        if(intervalId) return

        initialTime.value = Date.now();
        decorentTime.value = 0;

        intervalId = setInterval(() => {
            decorentTime.value = Math.floor((Date.now() - initialTime.value) / 1000)
        }, 1000);
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
    }

    function reset() {
        stop();
        initialTime.value = null;
        decorentTime.value = 0;
    }

    const formattedTime = computed(() => {
        const minutes = Math.floor(decorentTime.value / 60);
        const hours = Math.floor(minutes / 60);
        const seconds = decorentTime.value % 60
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })
    return{
        initialTime,
        start,
        stop,
        reset,
        formattedTime,
    }
})