<script lang="ts" setup>
interface Props {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
}

withDefaults(defineProps<Props>(), {
    subtitle: '',
    align: 'center'
});
</script>

<template>
    <div
        :class="{
            'items-start text-left': align === 'left',
            'items-center text-center': align === 'center',
            'items-end text-right': align === 'right'
        }"
        class="flex flex-col gap-2 mb-12 sm:mb-16"
    >
        <span
            v-if="subtitle != null && subtitle.length > 0"
            class="text-sm font-medium tracking-widest text-primary uppercase"
        >
            {{ subtitle }}
        </span>
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {{ title }}
        </h2>
        <slot />
    </div>
</template>
