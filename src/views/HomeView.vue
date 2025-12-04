<script setup>
import { onMounted, ref } from 'vue'
import { useAplicationStore } from '../stores/global'
import { useAudioStore } from '../stores/audio'
import { useSequenceStore } from '../stores/sequence'
import verifyResponse from '../tools/verifyResponse'
const sequenceStore = useSequenceStore()
const aplicationStore = useAplicationStore()
const audioStore = useAudioStore()

const response = ref([])
function click(index, path) {
    audioStore.playAudio(path);
    sequenceStore.selectDiscover(index);
}

function respond(choiceId, choiceObject, path) {
audioStore.playAudio(path);
  const index = sequenceStore.selectedIndex

  if (index === null || index === undefined) {
    console.warn('Selecione um "?" na sequência antes de escolher uma opção.')
    return
  }

  const correctIdForPosition = sequenceStore.correctResponses[index]

  if (correctIdForPosition === undefined) {
    console.log('Esta posição não tem resposta registrada:', index)
    sequenceStore.selectedIndex = null
    return
  }

  if (correctIdForPosition == choiceId) {
    response.value.push({ index, id: choiceId })
    sequenceStore.revealChoice(index, choiceObject)
    sequenceStore.selectedIndex = null
  } else {
    console.log(
      `Reposta errada para a posição ${index}, esperado: ${correctIdForPosition}, recebido ${choiceId}`,
    )
    sequenceStore.selectedIndex = null
    return
  }

  const expectedCount = sequenceStore.correctResponses.filter(id => id !== null).length
  if (response.value.length === expectedCount) {
    if (verifyResponse(response.value, sequenceStore.correctResponses)) {
      console.log('Parabéns! Você certou');
    } else{
        console.log('Errou ou programei errado')
    }
  }
}

onMounted(() => {
  sequenceStore.mountSequence(4, 12, 1, aplicationStore.aplication.sounds.objects)
  console.log(sequenceStore.sequence)
})

</script>
<template>
  <ul>
    <li
      v-for="(sound, index) in sequenceStore.sequence"
      :key="index"
      class="sound-card"
      :class="{ selected: index === sequenceStore.selectedIndex }"
      :style="`background-color: ${sound.object.color}`"
      @click="click(index, sound.object.path)"
    >
      {{ sound.object.name }}
    </li>
  </ul>
  <button @click="audioStore.playSequence(sequenceStore.sequence)">Tocar audios</button>
  <ul>
    <li
      v-for="sound in sequenceStore.finalChoices"
      class="sound-card"
      :style="{
        backgroundColor: sound.color,
      }"
      @click="respond(sound.id, sound, sound.path)"
    >
      {{ sound.name }}
    </li>
  </ul>
  <h2>Corrects</h2>
  <ul>
    <li v-for="id in sequenceStore.correctResponses">
      {{ id }}
    </li>
  </ul>
</template>
<style scoped>
ul {
  display: flex;
  gap: 20px;
}
li {
  list-style: none;
}

.sound-card {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.selected{
    opacity: 0.5;
}
</style>
