<script setup>
    import { onMounted, ref } from 'vue';
    import { useAplicationStore } from '../stores/global';
    import { useAudioStore } from '../stores/audio';
    import { useSequenceStore } from '../stores/sequence';
    const sequencStore = useSequenceStore();
    const applicationStore = useAplicationStore();
    const audioStore = useAudioStore();

    import sortObjects from '../tools/sort';
    
    onMounted(() => {
        sequencStore.mountSequence(4, 12, 1, applicationStore.aplication.sounds.objects);
        console.log(sequencStore.sequence)
    });
    
</script>
<template>
    <ul>
        <li v-for="sound in sequencStore.sequence"
            class="sound-card"
            :style="`background-color: ${sound.object.color}`"
            @click="audioStore.playAudio(sound.object.path)"
        >
            {{ sound.object.name }}
        </li>
    </ul>
    <button @click="audioStore.playSequence(sequencStore.sequence)">Tocar audios</button>
    <ul>
        <li v-for="sound in sequencStore.finalChoices"
            class="sound-card"
            :style="{
                backgroundColor: sound.color
            }"
            @click="audioStore.playAudio(sound.path)"
        >
            {{ sound.name }}
        </li>
    </ul>
    <h2>Corrects</h2>
    <ul>
        <li v-for="id in sequencStore.correctResponses">
            {{ id }}
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