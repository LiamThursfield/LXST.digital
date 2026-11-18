<script setup lang="ts">
defineProps<{
    items: Array<string>;
}>();
</script>

<template>
    <ul class="flex flex-wrap gap-2.5 font-mono text-[0.9375rem]">
        <li
            v-for="item in items"
            :key="item"
            class="rounded-md border border-border-strong px-3.5 py-2.5 leading-none"
        >
            {{ item }}
        </li>
    </ul>
</template>
