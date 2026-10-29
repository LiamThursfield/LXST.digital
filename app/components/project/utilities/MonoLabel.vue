<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        as?: string;
        tone?: 'muted' | 'highlight' | 'subtle';
    }>(),
    {
        as: 'span',
        tone: 'muted'
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
    <component :is="as" :class="cn('font-mono leading-normal', tones[props.tone])">
        <slot />
    </component>
</template>
