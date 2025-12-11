<script setup>

    import { useAplicationStore } from '../stores/aplication';
    const aplicationStore = useAplicationStore();

    const emits = defineEmits(['back', 'tryAgain']);
    const props = defineProps({
        theme: String 
    })

    function feedBack() {
        const status =  {...aplicationStore.aplication.themes[props.theme]};
        
        const title = status.countResponses > status.required ? 'Excelente!' : status.required === status.countResponses ? 'Muito Bom!' : 'Quase lá!';

        const subtitle = status.countResponses > status.required ? 'Você acertou mais do que o esperado, parabéns por seu desempenho!' : status.required === status.countResponses ? 'É isso aí, conseguiu atingir a meta de pontuação. Continue assim!' : 'Você pode não ter atingido a meta de pontuação, mas mostrou ser capaz!';

        return {
            title,
            subtitle
        }
    }

</script>

<template>
    <section class="flex flex-col items-center justify-center h-screen w-screen bg-black/40 fixed z-100">

            <ul class="flex flex-col items-center justify-center bg-white w-3/4 h-1/2 rounded-md shadow-2xl shadow-pink-500/50 md:w-1/2 md:h-3/4 gap-20 p-10">
                <li class="flex flex-col items-center w-full gap-5">
                    <h1 class="text-4xl text-pink-500">{{ feedBack().title }}</h1>
                    <p class="text-xl text-justify">{{ feedBack().subtitle }}</p>
                </li>
                <li class="flex flex-col text-white text-xl gap-4">

                    <button 
                        class="bg-pink-500 px-10 py-2 rounded-md border-2 border-pink-500 cursor-pointer hover:bg-white hover:text-pink-500 transition-all duration-300"
                        @click="emits('back')"
                    > 
                        Voltar 
                    </button>
                    <button 
                        class="bg-pink-500 px-10 py-2 rounded-md border-2 border-pink-500 cursor-pointer hover:bg-white hover:text-pink-500 transition-all duration-300"
                        @click="emits('tryAgain')"
                    >
                        Tentar Novamente
                    </button>

                </li>
            </ul>

    </section>
</template>