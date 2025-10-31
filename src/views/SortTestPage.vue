<script setup>
    const props = defineProps(['numberForms', 'size', 'discovers'])
    import { ref, onMounted } from 'vue';
    import { useSequenceStore } from '../stores/sequence';
    import { useAplicationStore } from '../stores/global';
    import verifyResponse from '../tools/verifyResponse';

    const correct = ref(null);
    const response = ref([]);
    const aplicationStore = useAplicationStore()

    const sequenceStore = useSequenceStore()

    function respond(id, choice) {
       const discoverIndex = sequenceStore.sequence.findIndex(obj => obj.object.name === 'discover')
       if (discoverIndex !== -1) {
        sequenceStore.revealChoice(discoverIndex, choice)
        response.value.push(id);
       }
       if(response.value.length == sequenceStore.correctResponses.length){
            correct.value = verifyResponse(response.value, sequenceStore.correctResponses)
       }            
    }

    function changeSequence() {
        sequenceStore.mountSequence(props.numberForms, props.size, props.discovers, aplicationStore.aplication.themes.forms.simbols);
        response.value = [];
        correct.value = null

    }

    onMounted(() => {
        sequenceStore.mountSequence(props.numberForms, props.size, props.discovers, aplicationStore.aplication.themes.forms.simbols);
    })
</script>
<template>
    <section>
        <div class="sequence">
            <p v-for="item of sequenceStore.sequence">
                <span :class="item.object.icon">{{ item.object.name }}</span>
            </p>
        </div>
        <div class="options">
            <div v-if="correct">correto</div>
            <div v-else-if="correct == null"></div>
            <div v-else>errado</div>
            <h2>Options:</h2>
            <p v-for="item of sequenceStore.finalChoices" @click="respond(item.id, item)">
                <span :class="item.icon">{{ item.name }}</span>
            </p>
        </div>
        <div class="reload">
            <button @click="changeSequence">Reload</button>
        </div>
        <div>
            corrects:
            <span v-for="index of sequenceStore.correctResponses"
                :key="index"
                :class="aplicationStore.aplication.themes.forms.simbols.find(item => item.id == index).icon"
            ></span>
        </div>
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

        p{
            cursor: pointer;
            transition: all 500ms;
        }
        p:hover{
            opacity: 0.5;
        }
    }
    p{
        background-color: rgb(206, 206, 206);
        padding: 10px;
        width: 20%;
        text-align: center;
    }
    .reload{
        text-align: center;
    }
</style>