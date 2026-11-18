<script setup lang="ts">
import Container from '~/components/project/utilities/Container.vue';

withDefaults(
    defineProps<{
        as?: string;
        /** Hairline across the full width above the section */
        bordered?: boolean;
        /** Lay children out in columns that stack on narrow screens */
        split?: boolean;
    }>(),
    {
        as: 'section',
        bordered: true,
        split: false
    }
);
</script>

<template>
    <component :is="as" :class="{ 'border-t border-border': bordered }">
        <Container :class="{ 'grid-split gap-x-20 gap-y-8': split }" class="py-section">
            <slot />
        </Container>
    </component>
</template>
