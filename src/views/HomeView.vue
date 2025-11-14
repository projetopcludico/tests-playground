<script setup>
    import { useAplicationStore } from '../stores/global';
    import { playAudio } from '../tools/audio';
    const applicationStore = useAplicationStore();
</script>
<template>
    <ul>
        <li v-for="sound in applicationStore.aplication.sounds.objects"
            class="sound-card"
            :style="`background-color: ${sound.color}`"
            @click="playAudio(sound.path)"
        >
            {{ sound.name }}
        </li>
    </ul>
</template>
<style scoped>
    ul{
        display: flex;
        gap: 20px;
    }
    li{
        list-style: none;
    }

    .sound-card{
        width: 50px;
        height: 50px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
</style>