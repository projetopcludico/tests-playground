<script setup>
    const title = 'Bem Vindo!'
    const subtitle = 'Esta é uma aplicação de teste para o projeto PC Lúdico que estamos desenvolvendo. No projeto são envolvidos jogos eduativos que englobam os temas de formas, sons e matemática.';
</script>
<template>
    <main class="flex flex-col gap-20 bg-white md:items-center p-10">
        <div class="w-full flex flex-col gap-5 items-center md:w-3/4">
            <h1 class="text-5xl">{{ title }}</h1>
            <p class="text-xl text-justify">{{ subtitle }}</p>
        </div>

    </main>
</template>