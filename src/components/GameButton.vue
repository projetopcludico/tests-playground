<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: Number,
  name: String,
  icon: String,
  color: String,
  background: String,
  selected: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['select'])

const buttonStyle = computed(() => {
    if(props.name === 'discover') return {
        color: '#ffffff',

    }
    return {
        color: props.color,
        backgroundColor: props.background
    }
})
</script>

<template>
  <button
    :style="buttonStyle"
    :class="[
      'w-25 h-25 flex flex-col items-center justify-center rounded-xl border-3 transition-all duration-200',
      props.selected && 'border-white animate-highlight',
      props.name === 'discover' && 'cursor-pointer'
    ]"
    @click="emits('select')"
  >
    <span :class="[props.icon, 'text-6xl']"></span>
  </button>
</template>

<style scoped>

</style>
