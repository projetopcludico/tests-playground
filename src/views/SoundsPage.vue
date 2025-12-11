<script setup>
    import FeedBackComp from '../components/FeedBackComp.vue';
    import SoundSequence from '../components/SoundSequence.vue';
    import SoundResponse from '../components/SoundResponse.vue';
    import { onMounted, ref } from 'vue';
    import { useAplicationStore } from '../stores/aplication';
    import { useAudioStore } from '../stores/audio';
    import { useSequenceStore } from '../stores/sequence';
    import { useTimeStamp } from '../stores/timeStamp';
    const audioStore = useAudioStore();
    const sequenceStore = useSequenceStore();
    const aplicationStore = useAplicationStore();
    const timeStamp = useTimeStamp();

    import { useRouter } from 'vue-router';
    const router = useRouter();

    const props = defineProps({
        numberSounds: String,
        size: String,
        discover: String,
        timeLimit: String,
    });

    const propsNumber = {
        numberSounds: Number(props.numberSounds),
        size: Number(props.size),
        discover: Number(props.discover),
        timeLimit: Number(props.timeLimit),
    }

    const feedBack = ref(false);

    function backHome() {
        router.push({ name: 'HomePage'});
    }

    function tryAgain() {
        sequenceStore.mountSequence(propsNumber.numberSounds, propsNumber.size, propsNumber.discover, aplicationStore.aplication.themes.sounds.objects);
        aplicationStore.aplication.themes.sounds.countResponses = 0;
        feedBack.value = false;
        timeStamp.reset();
        timeStamp.start(true, propsNumber.timeLimit, () => {
            feedBack.value = true
        })
    }

    onMounted(() => {
        tryAgain();
    })
</script>

<template>
    <FeedBackComp v-if="feedBack"
        theme="sounds"
        @back="backHome"
        @try-again="tryAgain"
    />
    <section class="flex flex-col items-center text-white gap-20 p-10">

        <div class="flex flex-col gap-5 text-black text-2xl md:text-center">
            <p>Acertos: {{ aplicationStore.aplication.themes.sounds.countResponses }}/{{ aplicationStore.aplication.themes.sounds.required }}</p>
            <p>Tempo restante: {{ timeStamp.formattedTime }}</p>
        </div>

        <div class="flex flex-wrap gap-5 justify-center">
            <SoundSequence 
                v-for="(sound, index) in sequenceStore.sequence" :key="index"
                :sound="sound"
                :index="index"
                @play-audio.="audioStore.playAudio"
            />
        </div>

        <div class="flex flex-col items-center gap-10">
            <h1 class="text-3xl text-black font-semibold">Opções:</h1>
            <div class="flex flex-wrap gap-5 justify-center">
                <SoundResponse 
                    v-for="sound in sequenceStore.finalChoices"
                    :sound="sound"
                    :params="propsNumber"
                    @play-audio="audioStore.playAudio"
                />
            </div>
        </div>

        <button 
            class="px-8 py-3 bg-pink-500 border-2 border-pink-500 text-2xl rounded-md cursor-pointer hover:bg-white hover:text-pink-500 transition-all duration-300"
            @click="backHome"
        >
            Sair
        </button>
    </section>

</template>