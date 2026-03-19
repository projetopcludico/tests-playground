<script setup>
const props = defineProps({
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
      !props.selected && 'bg-white text-slate-600 hover:bg-slate-50',
      props.selected && props.mode === 'default' && 'bg-orange-400 text-white',
      props.selected && props.mode === 'outline' && 'border border-orange-400 text-orange-400 bg-white'
    ]"
  >
    <span v-if="props.icon" :class="props.icon" class="text-4xl"></span>
    <p class="font-semibold">{{ props.text }}</p>
  </button>
</template>
