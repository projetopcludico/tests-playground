<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const props = defineProps({
        item: Object,
        routerName: String,
        params: Object,
        tabindex: Number
    })
</script>

<template>
    <div
        class="flex flex-col gap-5 items-center text-justify w-full p-8 border-l-4 border-pink-500 rounded-md shadow-xl cursor-pointer hover:shadow-none hover:bg-gray-100 md:w-1/4 transition-all duration-300" 
        @click="router.push({name: props.routerName, params: props.params })"
        :tabindex="props.tabindex"
        @keypress.enter="router.push({name: props.routerName, params: props.params })"
    >
        <h1 class="text-4xl text-pink-500">{{ props.item.title }}</h1>
        <p class="text-xl">{{ props.item.description }}</p>
    </div>
</template>