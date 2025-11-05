<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSequenceStore } from '../stores/sequence'
import { useAplicationStore } from '../stores/global'
import { useTimeStamp } from '../stores/timestamp'
import verifyResponse from '../tools/verifyResponse'

const props = defineProps(['numberForms', 'size', 'discovers', 'objectiveResponses'])

const aplicationStore = useAplicationStore()
const timeStamp = useTimeStamp()
const sequenceStore = useSequenceStore()
const { sequence, finalChoices, selectedIndex } = storeToRefs(sequenceStore)

const response = ref([])

function selectDiscover(index) {
  sequenceStore.selectDiscover(index)
}

function respond(choiceId, choiceObject) {
  const index = sequenceStore.selectedIndex

  if (index === null || index === undefined) {
    console.warn('Selecione um "?" na sequência antes de escolher uma opção.')
    return
  }

  response.value.push({ index, id: choiceId })
  sequenceStore.revealChoice(index, choiceObject)
  sequenceStore.selectedIndex = null


  const expectedCount = sequenceStore.correctResponses.filter(Boolean).length
  if (response.value.length === expectedCount) {
    if (verifyResponse(response.value, sequenceStore.correctResponses)) {
      aplicationStore.aplication.themes.forms.countResponses++
    }
    changeSequence()
  }
}

function changeSequence() {
  sequenceStore.mountSequence(props.numberForms, props.size, props.discovers, aplicationStore.aplication.themes.forms.simbols)
  response.value = []
}

onMounted(() => {
  sequenceStore.mountSequence(props.numberForms, props.size, props.discovers, aplicationStore.aplication.themes.forms.simbols)
  timeStamp.start(true, 30, () => {
    console.log('Seu tempo terminou')
  })
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
      <p
        class="card"
        v-for="(item, index) in sequence"
        :key="item.id"
        @click="selectDiscover(index)"
        :class="{ selected: index === sequenceStore.selectedIndex, disabled: item.object.name !== 'discover' }"
      >
        <span :class="item.object.icon"></span>
      </p>
    </div>

    <div class="options">
      <h2>Options:</h2>
      <a
        class="choice"
        href="#"
        v-for="item of finalChoices"
        :key="item.id"
        @click.prevent="respond(item.id, item)"
      >
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

        p.selected{
            opacity: 50%;
        }
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
        cursor: pointer;
    }
    p.disabled{
        cursor: default;
    }
    .reload{
        text-align: center;
    }
</style>