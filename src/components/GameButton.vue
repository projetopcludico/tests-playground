<script setup>
import { computed } from 'vue';

const { id, name, icon, color, background, selected } = defineProps({
  id: Number,
  name: String,
  icon: String,
  number: Number,
  color: String,
  background: String,
  selected: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['select'])

const buttonStyle = computed(() => {
    if(name === 'discover') return {
        color: '#ffffff',
        backgroundColor: '#000000'
    }
    return {
        backgroundColor: background,
        borderColor: color
    }
})
</script>

<template>
  <button
    :style="buttonStyle"
    :class="[
      'w-25 h-25 flex flex-col items-center justify-center rounded-xl border-3 transition-all duration-200 focus:scale-105',
      selected && 'border-white animate-highlight',
      name === 'discover' && 'cursor-pointer'
    ]"
    @click="emits('select')"
  >
    <span v-if="icon && name === 'discover'" :class="[icon, 'text-6xl']"></span>
    <div v-else-if="icon"
      class="w-3/5 h-3/5"
      :style="{
        backgroundColor: color,
        mask: `url(${icon}) no-repeat center / contain`,
        WebkitMask: `url(${icon}) no-repeat center / contain`
      }"
    ></div>
    <div v-else class="text-3xl font-bold" :style="{
      color: color
    }">{{ number }}</div>
  </button>
</template>

<style scoped>

</style>
