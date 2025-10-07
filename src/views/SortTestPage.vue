<script setup>
    const props = defineProps(['quantidade'])
    import mountSequence from '../tools/mountSequence';

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

    const moutSequence = mountSequence(props.quantidade, 10, obj);
</script>
<template>
    <section>
        <div>
            <p v-for="item of moutSequence.sequence">
                <span :class="item.object.icon">{{ item.object.name }}</span>
            </p>
        </div>
        <div>
            <p v-for="item of moutSequence.options">
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
    div{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
    p{
        background-color: rgb(206, 206, 206);
        padding: 10px;
        width: 20%;
        text-align: center;
    }
</style>