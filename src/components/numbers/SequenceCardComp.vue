<script setup>
    const props = defineProps({
        number: {
            type: Number,
            required: true,
        }
    });
</script>
<template>
  <button class="h-20 w-20 bg-pink-500 text-white text-xl">
    {{ props.number }}
  </button>
</template>
