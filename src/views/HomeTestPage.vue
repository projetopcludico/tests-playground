<script setup>
    import { useRouter } from 'vue-router';
    import { useAplicationStore } from '../stores/global';

    const router = useRouter();
    const aplicationStore = useAplicationStore();
</script>
<template>
    <ul>
        <li @click="
            router.push({ 
                name: 'sortTest',
                params: { ...aplicationStore.aplication.themes.forms.difficulties.easy.params } 
            });
        ">
            Fácil
        </li>
        <li @click="
            router.push({ 
                name: 'sortTest',
                params: { ...aplicationStore.aplication.themes.forms.difficulties.medim.params } 
            });
        ">
            Médio
        </li>
        <li @click="
            router.push({ 
                name: 'sortTest',
                params: { ...aplicationStore.aplication.themes.forms.difficulties.hard.params } 
            });
        ">
            Difícil
        </li>
    </ul>
</template>