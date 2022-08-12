<template>
    <button
        :class="{
            'nav-button': true,
            'text-2xl': true,
            'nav-button-selected': $route.path === destination,
        }"
        @click="$router.push(destination)">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
defineProps<{
    destination: string;
}>();
</script>

<style scoped>
.nav-button {
    @apply p-3 hover:bg-blue-300 transition;
}

.nav-button-selected {
    @apply bg-blue-500;
}
</style>
