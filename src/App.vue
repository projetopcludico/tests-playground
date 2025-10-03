<script setup>
    import { useTimeStamp } from './stores/timestamp';
    const timeStamp = useTimeStamp()
</script>

<template>
    <div>
        <p>Tempo decorrido: {{ timeStamp.formattedTime }}</p>
        <button @click="timeStamp.start">Iniciar</button>
        <button @click="timeStamp.pause">Parar</button>
        <button @click="timeStamp.reset">Resetar</button>
    </div>
    <div>
        <p></p>
    </div>
</template>

<style scoped>

</style>
