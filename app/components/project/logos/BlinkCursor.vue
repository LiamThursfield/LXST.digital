<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        blink?: boolean;
        class?: HTMLAttributes['class'];
    }>(),
    {
        blink: true,
        class: undefined
    }
);
</script>

<template>
    <!-- Terminal-style underscore cursor. Sized in em, so it scales with the surrounding text. -->
    <span
        :class="
            cn(
                'inline-block h-[0.11em] w-[0.42em] ml-[0.08em] bg-primary',
                props.blink && 'animate-blink motion-reduce:animate-none',
                props.class
            )
        "
        aria-hidden="true"
    />
</template>
