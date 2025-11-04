import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useTimeStamp = defineStore('timeStamp', () => {

  const seconds = ref(0)
  let intervalId = null
  let lastStart = 0

  const start = (countDown = false, time = Number, callBack = null) => {
    if (intervalId) return

    if(countDown){
      if(typeof time === "number" && time > 0){
        seconds.value = time
      } else {
        return console.log('O tempo precisa ser maior que 0 para contagem regressiva!')
      }
    } 

    lastStart = Date.now();

    intervalId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastStart) / 1000);
      lastStart = Date.now();

      if(countDown) {
        seconds.value = Math.max(0, seconds.value - elapsed);

        if(seconds.value <= 0) {

          pause();
          if(callBack && typeof callBack === "function"){
            callBack();
          }

        }

      } else{
        seconds.value += elapsed;
      }
    }, 1000)
  }

  const pause = () => {
    clearInterval(intervalId)
    intervalId = null
  }

  const reset = () => {
    pause()
    seconds.value = 0
  }

  // Computed para usar direto no template
  const formattedTime = computed(() => {
    const h = Math.floor(seconds.value / 3600).toString().padStart(2, '0')
    const m = Math.floor((seconds.value % 3600) / 60).toString().padStart(2, '0')
    const s = (seconds.value % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  })

  return { seconds, start, pause, reset, formattedTime}
})