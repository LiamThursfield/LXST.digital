<script setup lang="ts">
export type Step = { label: string; title: string; text: string };

withDefaults(
    defineProps<{
        items: Array<Step>;
        /**
         * `first`: thick top rules with the first one in brand colour (a process).
         * `labels`: hairline rules with brand-coloured labels (a set of principles).
         */
        accent?: 'first' | 'labels';
    }>(),
    {
        accent: 'labels'
    }
);
</script>

<template>
    <ol
        :class="accent === 'first' ? 'gap-x-8 gap-y-10' : 'gap-x-8'"
        class="grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))]"
    >
        <li
            v-for="(item, index) in items"
            :key="item.title"
            :class="
                accent === 'first'
                    ? ['border-t-2 pt-5', index === 0 ? 'border-primary' : 'border-border-strong']
                    : 'border-t border-border pt-6 pb-8'
            "
            class="flex flex-col gap-3"
        >
            <span
                :class="
                    accent === 'first'
                        ? 'text-[0.8125rem] text-muted-foreground'
                        : 'text-sm text-highlight'
                "
                class="font-mono"
            >
                {{ item.label }}
            </span>
            <span class="text-2xl font-medium tracking-[-0.02em]">{{ item.title }}</span>
            <span class="text-base text-muted-foreground">{{ item.text }}</span>
        </li>
    </ol>
</template>
