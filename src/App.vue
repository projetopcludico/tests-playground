<script setup>
    import { useTimeStamp } from './stores/timestamp';
    const timeStamp = useTimeStamp()
</script>

<template>
    <div>
        <p>⏱ Tempo decorrido: {{ timeStamp.formattedTime }}</p>
        <button @click="timeStamp.start">Iniciar</button>
        <button @click="timeStamp.stop">Parar</button>
        <button @click="timeStamp.reset">Resetar</button>
    </div>
</template>

<style scoped>

</style>
