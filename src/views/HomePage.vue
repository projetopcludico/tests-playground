<script setup>
    import CardComp from '../components/CardComp.vue';
    import { useAplicationStore } from '../stores/aplication';
    const aplicationStore = useAplicationStore();

    const title = "Bem Vindo!";
    const subtitle = "Esta é uma aplicação de teste para o projeto PC Lúdico que estamos desenvolvendo. Você pode escolher as as devidas dificuldades no modo de som:"
    const difficulties = {...aplicationStore.aplication.themes.sounds.difficulties}

</script>

<template>
    <div class="flex flex-col gap-20 bg-white md:items-center p-10">
        <div class="w-full flex flex-col gap-5 items-center md:w-3/4">
            <h1 class="text-5xl">{{ title }}</h1>
            <p class="text-xl text-justify">{{ subtitle }}</p>
        </div>
        <div class="flex flex-col justify-center items-center gap-10 md:flex-row">
            <CardComp v-for="difficultie in difficulties"
                :item="difficultie"
                :params="difficultie.params"
                router-name="SoundsPage"
            />
        </div>
    </div>
</template>