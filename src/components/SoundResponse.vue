<script setup>
    import verifyResponse from '../tools/verifyResponse'
    import { useAplicationStore } from '../stores/aplication'
    import { useSequenceStore } from '../stores/sequence'
    const aplicationStore = useAplicationStore();
    const sequenceStore = useSequenceStore();


    const emits = defineEmits(['playAudio'])
    const props = defineProps({
        sound: Object,
        params: Object
    })

    const correctSound = new Audio('/sounds/warns/correct.mp3');
    const nextStageSound = new Audio('/sounds/warns/nextStage.mp3');
    const errorSound = new Audio('/sounds/warns/error.mp3');

    function respond(choiceId, choiceObject, path) {
        emits('playAudio', path)
        const index = sequenceStore.selectedIndex

        if (index === null || index === undefined) return;

        const correctIdForPosition = sequenceStore.correctResponses[index]

        if (correctIdForPosition === undefined) {
            console.log('Esta posição não tem resposta registrada:', index)
            sequenceStore.selectedIndex = null
            return
        }

        if (correctIdForPosition == choiceId) {
            sequenceStore.responses.push({ index, id: choiceId })
            sequenceStore.revealChoice(index, choiceObject)
            sequenceStore.selectedIndex = null
            correctSound.play();
        } else {
            console.log(
            `Reposta errada para a posição ${index}, esperado: ${correctIdForPosition}, recebido ${choiceId}`,
            )
            sequenceStore.selectedIndex = null
            errorSound.play();
            return
        }

        const expectedCount = sequenceStore.correctResponses.filter((id) => id !== null).length
        if (sequenceStore.responses.length === expectedCount) {
            if (verifyResponse(sequenceStore.responses, sequenceStore.correctResponses)) {
                aplicationStore.aplication.themes.sounds.countResponses++
                sequenceStore.mountSequence(
                    props.params.numberSounds, 
                    props.params.size, 
                    props.params.discover, 
                    aplicationStore.aplication.themes.sounds.objects
                );
                sequenceStore.responses = []
                nextStageSound.play();
            } else {
                sequenceStore.mountSequence(
                    props.params.numberSounds, 
                    props.params.size, 
                    props.params.discover, 
                    aplicationStore.aplication.themes.sounds.objects
                );
            }
        }
    }
</script>

<template>

    <a href="#"
        @click="respond(props.sound.id, props.sound, props.sound.path)"
        @focus="emits('playAudio', props.sound.path)"
    >
        <div class="flex flex-col w-20 h-20 items-center justify-center rounded-md"
            :style="{ backgroundColor: props.sound.color}"
        >
            <p class="text-2xl">{{ props.sound.name }}</p>
        </div>
    </a>

</template>
