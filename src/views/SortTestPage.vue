<script setup>
    const props = defineProps(['numberForms', 'size', 'discovers', 'objectiveResponses'])
    import { ref, onMounted } from 'vue';
    import { useSequenceStore } from '../stores/sequence';
    import { useAplicationStore } from '../stores/global';
    import { useTimeStamp } from '../stores/timestamp';
    import verifyResponse from '../tools/verifyResponse';

    const response = ref([]);
    const aplicationStore = useAplicationStore()
    const timeStamp = useTimeStamp();
    const sequenceStore = useSequenceStore()

    function respond(id, choice) {
       const discoverIndex = sequenceStore.sequence.findIndex(obj => obj.object.name === 'discover')
       if (discoverIndex !== -1) {
        sequenceStore.revealChoice(discoverIndex, choice)
        response.value.push(id);
       }
       if(response.value.length == sequenceStore.correctResponses.length){
            if(verifyResponse(response.value, sequenceStore.correctResponses)){
                aplicationStore.aplication.themes.forms.countResponses++;
            }
            changeSequence();
       }            
    }

    function changeSequence() {
        sequenceStore.mountSequence(props.numberForms, props.size, props.discovers, aplicationStore.aplication.themes.forms.simbols);
        response.value = [];
    }

    onMounted(() => {
        sequenceStore.mountSequence(props.numberForms, props.size, props.discovers, aplicationStore.aplication.themes.forms.simbols);
        timeStamp.start(true, 30, () => {
            console.log('Seu tempo terminou');
        });
    })
</script>
<template>
    <section class="manage">
        <p>{{ timeStamp.formattedTime }}</p>
        <p>
            {{ aplicationStore.aplication.themes.forms.countResponses }}/
            {{ props.objectiveResponses }}
        </p>
    </section>
    <section class="game">
        <div class="sequence">
            <p class="card" v-for="item of sequenceStore.sequence">
                <span :class="item.object.icon"></span>
            </p>
        </div>
        <div class="options">
            <h2>Options:</h2>
            <a class="choice" href="#" v-for="item of sequenceStore.finalChoices" @click="respond(item.id, item)">
                <span :class="item.icon"></span>
            </a>
        </div>
    </section>
</template>
<style scoped>
    section.game{
        display: flex;
        gap: 5vw;
        font-size: 2rem;
    }
    section.manage{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    div.sequence{
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        width: 50%;
        justify-content: center;
    }
    div.options{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0;

        a.choice{
            cursor: pointer;
            transition: all 500ms;
        }
        a.choice:hover{
            opacity: 0.5;
        }
    }
    p.card{
        width: 20%;
        text-align: center;
    }
    .reload{
        text-align: center;
    }
</style>