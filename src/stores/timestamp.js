import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTimeStamp = defineStore("timeStamp", () => {
  const seconds = ref(0);
  let intervalId = null;
  let startTime = 0;
  let initialSeconds = 0;

  const start = (countDown = false, time = null, callBack = null) => {
    if (intervalId) return;

    if (countDown) {
      if (typeof time === "number" && time > 0) {
        seconds.value = time;
        initialSeconds = time;
      } else {
        console.log("O tempo precisa ser maior que 0 para contagem regressiva!");
        return;
      }
    } else {
      initialSeconds = seconds.value;
    }

    startTime = Date.now();

    intervalId = setInterval(() => {
      const totalElapsed = Math.floor((Date.now() - startTime) / 1000);

      if (countDown) {
        seconds.value = Math.max(0, initialSeconds - totalElapsed);
        if (seconds.value <= 0) {
          pause();
          if (callBack && typeof callBack === "function") {
            callBack();
          }
        }
      } else {
        seconds.value = initialSeconds + totalElapsed;
      }
    }, 200);
  };

  const pause = () => {
    clearInterval(intervalId);
    intervalId = null;
  };

  const reset = () => {
    pause();
    seconds.value = 0;
  };

  const formattedTime = computed(() => {
    const h = Math.floor(seconds.value / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds.value % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds.value % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  });

  return { seconds, start, pause, reset, formattedTime };
});
