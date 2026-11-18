<script setup lang="ts">
import BlinkCursor from '~/components/project/logos/BlinkCursor.vue';

withDefaults(
    defineProps<{
        /**
         * `nav`: muted `.digital` and a blinking cursor.
         * `giant`: the oversized, low-contrast footer mark.
         */
        variant?: 'nav' | 'giant';
    }>(),
    {
        variant: 'nav'
    }
);
</script>

<template>
    <!-- Font size comes from the parent; everything inside is sized in em -->
    <span
        :class="variant === 'nav' ? 'tracking-[-0.04em]' : 'tracking-[-0.06em] text-ghost'"
        class="inline-flex items-baseline leading-none whitespace-nowrap"
    >
        <span class="font-bold">lxst</span>
        <span :class="{ 'text-muted-foreground': variant === 'nav' }" class="font-medium">
            .digital
        </span>
        <BlinkCursor v-if="variant === 'nav'" class="h-[0.15em] w-[0.46em] ml-[0.15em]" />
        <BlinkCursor v-else :blink="false" class="h-[0.09em] w-[0.4em] ml-[0.06em]" />
    </span>
</template>
