<script lang="ts" setup>
interface Props {
    title: string;
    subtitle?: string;
    description?: string;
    align?: 'left' | 'center' | 'right';
}

withDefaults(defineProps<Props>(), {
    subtitle: '',
    description: '',
    align: 'center'
});
</script>

<template>
    <section class="relative pt-38 pb-16">
        <!-- Background Glow -->
        <div class="absolute inset-0 pointer-events-none">
            <div
                class="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[600px] bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-15 blur-[80px] -mt-[180px] md:-mt-[200px]"
            />
        </div>

        <div class="container mx-auto px-4 relative z-10">
            <div
                :class="{
                    'items-start text-left': align === 'left',
                    'items-center text-center': align === 'center',
                    'items-end text-right': align === 'right'
                }"
                class="flex flex-col gap-4 max-w-4xl mx-auto"
            >
                <div
                    v-if="subtitle"
                    class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-2"
                >
                    {{ subtitle }}
                </div>

                <h1
                    class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                >
                    {{ title }}
                </h1>

                <p
                    v-if="description"
                    class="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mt-2"
                >
                    {{ description }}
                </p>

                <slot />
            </div>
        </div>
    </section>
</template>
