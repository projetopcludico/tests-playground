import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useTimeStamp = defineStore('timeStamp', () => {

  const seconds = ref(0)
  let intervalId = null
  let lastStart = 0

  const start = () => {
    if (intervalId) return

    lastStart = Date.now() - seconds.value * 1000

    intervalId = setInterval(() => {
      seconds.value = Math.floor((Date.now() - lastStart) / 1000)
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