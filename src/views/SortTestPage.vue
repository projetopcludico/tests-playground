<script setup>
    const props = defineProps(['quantidade'])
    import { ref } from 'vue';
    import useMountSequence from '../tools/mountSequence';
    import verifyResponse from '../tools/verifyResponse';

    const correct = ref(null);

    const obj = [
        {
            id: 1,
            name: 'circle',
            icon: 'mdi mdi-circle-outline'
        },
        {
            id: 2,
            name: 'rectangle',
            icon: 'mdi mdi-rectangle-outline'
        },
        {
            id: 3,
            name: 'pentagon',
            icon: 'mdi mdi-pentagon-outline'
        },
        {
            id: 4,
            name: 'triangle',
            icon: 'mdi mdi-triangle-outline'
        },
    ]

    const moutSequence = useMountSequence(props.quantidade, 9, obj);

    function respond(id) {
       correct.value = verifyResponse(id, moutSequence.correctResponse.object.id)            
    }
</script>
<template>
    <section>
        <div class="sequence">
            <p v-for="item of moutSequence.sequence">
                <span :class="item.object.icon">{{ item.object.name }}</span>
            </p>
        </div>
        <div class="options">
            <div v-if="correct">correto</div>
            <div v-else-if="correct == null"></div>
            <div v-else>errado</div>
            <h2>Options:</h2>
            <p v-for="item of moutSequence.finalChoices" @click="respond(item.id)">
                <span :class="item.icon">{{ item.name }}</span>
            </p>
        </div>
        <p>
            Correct: <span :class="moutSequence.correctResponse.object.icon">{{ moutSequence.correctResponse.object.name }}</span>
        </p>
    </section>
</template>
<style scoped>
    section{
        display: flex;
        flex-direction: column;
        gap: 5vw;
        font-size: 2rem;
    }
    div.sequence{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }
    div.options{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;
    }
    p{
        background-color: rgb(206, 206, 206);
        padding: 10px;
        width: 20%;
        text-align: center;
    }
</style>