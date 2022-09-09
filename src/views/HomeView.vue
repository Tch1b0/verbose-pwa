<template>
    <a href="https://verbose.raphaelpour.de">
        <img
            src="https://verbose.raphaelpour.de/logo.png"
            alt="Verbose Logo"
            class="mt-5 mb-3 rounded-md outline-double outline-4 outline-black" />
    </a>
    <p class="text-gray-400 mb-6">
        A PWA for
        <a
            href="https://verbose.raphaelpour.de"
            class="text-blue-400 hover:underline"
            >Verbose</a
        >
    </p>

    <search-bar class="pb-3" @inputUpdated="filterVocs"></search-bar>
    <table>
        <tr>
            <th>EN</th>
            <th>DE</th>
            <th>⭐</th>
        </tr>
        <tr v-for="[k, v] of displayedVocs" :key="k">
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
</template>

<script lang="ts" setup>
import store from "@/store";
import SearchBar from "@/components/SearchBar.vue";
import { ref } from "vue";

const allVocs: { [key: string]: { words: string[] } } = await (
    await fetch("https://verbose.raphaelpour.de/api/v1/words")
).json();
const displayedVocs = ref(Object.entries(allVocs));

function filterVocs(input: string) {
    if (input === "") {
        displayedVocs.value = Object.entries(allVocs);
        return;
    }

    displayedVocs.value = [];
    for (const [key, value] of Object.entries(allVocs)) {
        const letterPool = input.replace(" ", "");
        if (
            containsLetters(key, letterPool) ||
            value.words.some((val: string) => containsLetters(val, letterPool))
        ) {
            displayedVocs.value.push([key, value]);
        }
    }
}

function containsLetters(word: string, letters: string): boolean {
    word = word.toLowerCase();
    for (const char of letters.toLowerCase()) {
        if (!word.includes(char)) return false;
        word = word.replace(char, "");
    }
    return true;
}
</script>

<style>
tr {
    @apply odd:bg-gray-200;
}
th,
td {
    @apply border-b-2 border-black pt-2 pb-2 pl-2 md:pr-3 lg:pr-10;
}
</style>
