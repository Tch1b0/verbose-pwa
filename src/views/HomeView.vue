<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl mt-5 mb-16">Verbose</h1>
        <table>
            <tr>
                <th>EN</th>
                <th>DE</th>
                <th>⭐</th>
            </tr>
            <tr v-for="[k, v] of Object.entries(exampleVoc)" :key="k">
                <td>{{ k }}</td>
                <td>{{ v.words.join(", ") }}</td>
                <td>
                    <button
                        title="Add to collection"
                        @click="store.dispatch('toggleFavourite', k)">
                        {{ store.state.favourites.includes(k) ? "⭐" : "⭕" }}
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts" setup>
import store from "@/store";
const exampleVoc: { [key: string]: { words: string[] } } = await (
    await fetch("https://verbose.raphaelpour.de/api/v1/words")
).json();
</script>

<style>
tr {
    @apply odd:bg-gray-200;
}
th,
td {
    @apply border-b-2 border-black pt-2 pb-2 pl-2 pr-10;
}
</style>
