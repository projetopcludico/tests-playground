<script setup>
  defineEmits(['respond']);
  const props = defineProps({
    index: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    respond: {
      type: Boolean,
      required: true,
    }
  })
</script>
<template>
  <button v-if="!props.respond" class="h-20 w-20 bg-pink-500 text-white text-xl rounded-md shadow-xl shadow-pink-300">
    {{ props.number }}
  </button>
  <button v-else 
    class="h-20 w-20 bg-pink-500 text-white text-xl rounded-md shadow-xl shadow-pink-300 cursor-pointer"
    @click="$emit('respond', props.number)"
  >
    {{ props.number }}
  </button>
</template>
