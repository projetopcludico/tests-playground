<script setup>
    const props = defineProps(['quantidade'])
    import { ref } from 'vue';
    import useMountSequence from '../tools/mountSequence';
    import verifyResponse from '../tools/verifyResponse';

    const correct = ref(null);
    const response = ref([]);

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

    const moutSequence = useMountSequence(Number(props.quantidade), 15, 2, obj);

    function respond(id) {
       response.value.push(id);
       if(response.value.length == moutSequence.correctResponses.length){
            correct.value = verifyResponse(response.value, moutSequence.correctResponses)
       }            
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
        <!-- <p>
            Corrects: 
            <span v-for="index in moutSequence.correctResponses"
                :key="index"
                :class="obj.find(item => item.id == index).icon"
            ></span>
        </p> -->
        <div>
            Responses:
            <p v-for="index in response"
               :class="obj.find(item => item.id == index).icon" >
            </p>
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
</style>