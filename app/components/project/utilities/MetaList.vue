<script setup lang="ts">
export type MetaItem = { term: string; value: string; highlight?: boolean };

withDefaults(
    defineProps<{
        items: Array<MetaItem>;
        size?: 'sm' | 'md';
    }>(),
    {
        size: 'sm'
    }
);
</script>

<template>
    <!-- Monospace key/value pairs: `stack   laravel · nuxt` -->
    <dl
        :class="size === 'md' ? 'gap-x-8 gap-y-3 text-[0.9375rem]' : 'gap-x-6 gap-y-2 text-sm'"
        class="grid grid-cols-[max-content_1fr] font-mono leading-snug text-muted-foreground"
    >
        <template v-for="item in items" :key="item.term">
            <dt>{{ item.term }}</dt>
            <dd :class="item.highlight ? 'text-highlight' : 'text-foreground'">
                {{ item.value }}
            </dd>
        </template>
    </dl>
</template>
