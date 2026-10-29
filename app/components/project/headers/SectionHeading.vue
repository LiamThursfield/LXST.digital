<script setup lang="ts">
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';

defineProps<{
    id: string;
    title: string;
    /** Mono label on the right, e.g. `~/process` */
    label?: string;
    /** Turns the label into a link */
    to?: string;
}>();
</script>

<template>
    <div class="mb-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
        <h2 :id="id" class="max-w-[16ch] text-heading font-bold">{{ title }}</h2>
        <NuxtLink
            v-if="label && to"
            :to="to"
            class="py-2.5 font-mono text-sm text-muted-foreground transition-colors hover:text-highlight"
        >
            {{ label }}
        </NuxtLink>
        <MonoLabel v-else-if="label">{{ label }}</MonoLabel>
    </div>
</template>
