<script setup lang="ts">
defineProps<{
    items: Array<string>;
}>();
</script>

<template>
    <!-- Plain list separated by hairlines -->
    <ul class="flex flex-col">
        <li v-for="item in items" :key="item" class="border-t border-border py-3.5 last:border-b">
            {{ item }}
        </li>
    </ul>
</template>
