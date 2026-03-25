<script setup>
const emits = defineEmits(['function'])

const { text, type, color } = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'button',
    validator: (type) => ['button', 'reset', 'submit'].includes(type),
  },
  color: {
    type: String,
    default: 'red',
    validator: (color) => ['red', 'blue', 'purple'].includes(color),
  },
})
</script>

<template>
  <button
    :type="type"
    :class="[
      'w-full text-white text-2xl px-4 py-2 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-105',
      color === 'red' && 'bg-red-400',
      color === 'blue' && 'bg-blue-300',
      color === 'purple' && 'bg-purple-400',
    ]"
    @click="emits('function')"
  >
    {{ text }}
  </button>
</template>
