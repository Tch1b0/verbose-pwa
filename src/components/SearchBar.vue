<template>
    <div>
        <button>🔍</button>
        <input
            type="text"
            placeholder="search..."
            class="pl-1 pr-1 border-2 border-black rounded-sm"
            v-model="input" />
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";

const emit = defineEmits<{
    inputUpdated: (input: string) => any;
}>();

const input = reactive(ref(""));
watch(input, () => {
    // @ts-ignore
    emit("inputUpdated", input.value);
});
</script>
