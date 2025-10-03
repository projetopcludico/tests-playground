<script setup>
    const props = defineProps(['quantidade'])
    import mountSequence from '../tools/mountSequence';

    const obj = [
        {
            id: 1,
            name: 'circle'
        },
        {
            id: 2,
            name: 'rectangle'
        },
        {
            id: 3,
            name: 'pentagon'
        },
        {
            id: 4,
            name: 'triangle'
        },
    ]

    const moutSequence = mountSequence(props.quantidade, 10, obj);
</script>
<template>
    <section>
        <div>
            <p v-for="item of moutSequence.sequence">
                {{ item.object.name }}
            </p>
        </div>
        <div>
            <p v-for="item of moutSequence.itenSequence">
                {{ item.name }}
            </p>
        </div>
        <p>
            Correct: {{ moutSequence.correctResponse.object.name }}
        </p>
    </section>
</template>
<style scoped>
    section{
        display: flex;
        flex-direction: column;
        gap: 5vw;
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