<template>
    <div class="bg-gray-300 rounded-lg grid grid-cols-2 w-fit p-5">
        <div>
            <p>{{ word }} ➡</p>
        </div>
        <div class="flex">
            <p v-for="translation of translations">{{ translation }},</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    word: string;
    translations: string[];
}>();
</script>
