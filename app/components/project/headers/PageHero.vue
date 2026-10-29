<script setup lang="ts">
import Container from '~/components/project/utilities/Container.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';

withDefaults(
    defineProps<{
        /** Path-style label above the title, e.g. `~/services` */
        label?: string;
        /**
         * `display`: short, very large title (services, work).
         * `statement`: a sentence-long title (about).
         */
        size?: 'display' | 'statement';
    }>(),
    {
        label: undefined,
        size: 'display'
    }
);

const slots = defineSlots<{
    default(): unknown;
    lead?(): unknown;
}>();
</script>

<template>
    <Container
        :class="{ 'grid-split [--split-min:23.75rem] items-end gap-x-20 gap-y-8': slots.lead }"
        as="section"
        class="pt-hero pb-section"
    >
        <div>
            <MonoLabel v-if="label">{{ label }}</MonoLabel>
            <h1
                :class="
                    size === 'display' ? 'text-display' : 'text-statement max-w-[18ch] text-balance'
                "
                class="mt-4 font-bold"
            >
                <slot />
            </h1>
        </div>

        <p v-if="slots.lead" class="max-w-[30em] text-lead text-foreground-soft text-pretty">
            <slot name="lead" />
        </p>
    </Container>
</template>
