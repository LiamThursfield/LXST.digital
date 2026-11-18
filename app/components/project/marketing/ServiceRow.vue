<script setup lang="ts">
import type { Service } from '~/composables/project/data';

defineProps<{
    service: Service;
    number: string;
    to: string;
}>();
</script>

<template>
    <!-- One line of the home page services index -->
    <NuxtLink
        :to="to"
        class="group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-2 border-t border-border py-7 last:border-b"
    >
        <span class="font-mono text-sm text-highlight">{{ number }}</span>
        <span class="flex flex-col gap-1.5">
            <span class="text-item font-medium">{{ service.title }}</span>
            <span class="max-w-[36em] text-[1.0625rem] text-muted-foreground">
                {{ service.summary }}
            </span>
        </span>
        <span
            aria-hidden="true"
            class="text-2xl text-subtle-foreground transition-transform duration-200 ease-out group-hover:translate-x-1.5 group-hover:text-highlight"
        >
            →
        </span>
    </NuxtLink>
</template>
