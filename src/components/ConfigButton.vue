<script setup>
const { text, icon, selected, mode } = defineProps({
  text: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
    required: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outline'].includes(value),
  },
});
</script>
<template>
  <button 
    :class="[
      'flex flex-col text-center w-full p-6 rounded-xl cursor-pointer transition-all duration-200',
      !selected && 'bg-white text-slate-600 hover:bg-slate-50',
      selected && mode === 'default' && 'bg-orange-400 text-white',
      selected && mode === 'outline' && 'border border-orange-400 text-orange-400 bg-white'
    ]"
  >
    <span v-if="icon" :class="icon" class="text-4xl"></span>
    <p class="font-semibold">{{ text }}</p>
  </button>
</template>
