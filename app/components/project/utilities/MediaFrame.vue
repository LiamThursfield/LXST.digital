<script setup lang="ts">
withDefaults(
    defineProps<{
        src?: string;
        alt?: string;
        /** Shown on the striped placeholder when there's no image yet */
        label?: string;
    }>(),
    {
        src: undefined,
        alt: '',
        label: undefined
    }
);
</script>

<template>
    <!-- Bordered image box; the parent sets the aspect ratio. Darkens slightly when a parent `.group` is hovered. -->
    <div class="relative overflow-hidden border border-border bg-card">
        <NuxtImg
            v-if="src"
            :alt="alt"
            :src="src"
            class="absolute inset-0 size-full object-cover"
            loading="lazy"
            sizes="100vw md:60vw lg:800px"
        />
        <div
            v-else
            class="absolute inset-0 flex items-end bg-[repeating-linear-gradient(135deg,var(--card)_0_12px,var(--stripe)_12px_24px)] p-4"
        >
            <span v-if="label" class="font-mono text-[0.8125rem] text-subtle-foreground">
                {{ label }}
            </span>
        </div>
        <span
            aria-hidden="true"
            class="absolute inset-0 bg-overlay opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
    </div>
</template>
