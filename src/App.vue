<script setup>
    import sort from './tools/sort';

    const obj = [
        {
            id: 1,
            name: 'circle'
        },
        {
            id: 2,
            name: 'rectangle'
        },
        {
            id: 3,
            name: 'pentagon'
        },
        {
            id: 4,
            name: 'triangle'
        },
    ]
</script>

<template>
    <p v-for="item of sort(2, obj)">
        {{ item.name }}
    </p>
</template>

<style scoped>

</style>
