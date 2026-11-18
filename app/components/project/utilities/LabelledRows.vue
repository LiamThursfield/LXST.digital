<script setup lang="ts">
export type LabelledRow = { label: string; title?: string; text: string };

withDefaults(
    defineProps<{
        items: Array<LabelledRow>;
        /** `narrow` fits a number (`01`), `wide` fits a word or two (`built to grow`) */
        labelWidth?: 'narrow' | 'wide';
        as?: 'ul' | 'ol';
    }>(),
    {
        labelWidth: 'narrow',
        as: 'ul'
    }
);
</script>

<template>
    <!-- Hairline rows with a mono label in the left column -->
    <component :is="as" class="flex flex-col">
        <li
            v-for="item in items"
            :key="item.label"
            :class="
                labelWidth === 'wide'
                    ? 'grid-cols-[minmax(0,8.75rem)_minmax(0,1fr)] gap-x-6 py-4.5'
                    : 'grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-5'
            "
            class="grid gap-y-1 border-t border-border last:border-b"
        >
            <span class="pt-1 font-mono text-sm text-highlight">{{ item.label }}</span>
            <span v-if="item.title">
                <strong class="block text-xl font-medium">{{ item.title }}</strong>
                <span class="text-[1.0625rem] text-muted-foreground">{{ item.text }}</span>
            </span>
            <span v-else class="text-[1.0625rem] text-foreground-soft">{{ item.text }}</span>
        </li>
    </component>
</template>
