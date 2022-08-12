<template>
    <h1 class="text-3xl mt-20">
        🛠 Under Construction<span>{{ dots }}</span>
    </h1>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const DURATION = 750;
let dots = ref("...");

function handleDots() {
    if (dots.value === "...") {
        dots.value = "";
    } else {
        dots.value += ".";
    }
    setTimeout(handleDots, DURATION);
}

handleDots();
</script>
