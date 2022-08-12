<template>
    <div>
        <div class="flex flex-col items-center justify-center mb-20">
            <router-view />
        </div>
        <div
            class="w-full fixed bottom-0 flex flex-rows justify-center items-center bg-gray-700">
            <nav-button destination="/">🏠</nav-button>
            <nav-button destination="/learn">🎓</nav-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import NavButton from "@/components/NavButton.vue";
</script>
