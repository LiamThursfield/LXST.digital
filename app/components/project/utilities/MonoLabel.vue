<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        as?: string;
        tone?: 'muted' | 'highlight' | 'subtle';
        class?: HTMLAttributes['class'];
    }>(),
    {
        as: 'span',
        tone: 'muted',
        class: undefined
    }
);

const tones = {
    muted: 'text-sm text-muted-foreground',
    highlight: 'text-sm text-highlight',
    subtle: 'text-[0.8125rem] text-subtle-foreground'
};
</script>

<template>
    <!-- Small monospace label: `~/services`, section numbers, footer column headings -->
    <component :is="as" :class="cn('font-mono leading-normal', tones[props.tone], props.class)">
        <slot />
    </component>
</template>
