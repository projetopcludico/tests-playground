<script setup>

    import { useSequenceStore } from '../stores/sequence';
    const sequenceStore = useSequenceStore();

    const emits = defineEmits(['playAudio']);
    const props = defineProps({
        sound: Object,
        index: Number,
    });

    function click() {
        emits('playAudio', props.sound.object.path);
        sequenceStore.selectDiscover(props.index);
    }
</script>

<template>

    <a  href="#"
        :title="props.sound.object.name == 'discover' ? 'descobrir o som' : `som ${props.index + 1}`" 
        @click="click"
        @focus="emits('playAudio', props.sound.object.path)"                
    >
        <div 
            :class="
                props.index === sequenceStore.selectedIndex
                ? 'flex flex-col bg-pink-500/50 items-center justify-center w-20 h-20 border rounded-md' 
                : 'flex flex-col bg-pink-500 items-center justify-center w-20 h-20 border border-black rounded-md'
            "
        >
             <span class="text-4xl" :class="props.sound.object.icon"></span> <!--tentar retirar pois está bugando o leitor -->
        </div>
    </a>

</template>