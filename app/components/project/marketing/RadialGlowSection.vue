<script lang="ts" setup>
interface Props {
    title: String;
    subtitle?: String;
    content?: String;
}

defineProps<Props>();
</script>

<template>
    <section class="py-24 px-4 relative overflow-hidden">
        <div class="container mx-auto max-w-content-container text-center">
            <div
                class="absolute w-[100vw] h-[914px] left-0 top-[-600px] bg-[radial-gradient(closest-side,white,transparent)] opacity-20 blur-[100px] transform-gpu"
            />

            <div
                class="absolute w-[100vw] h-[914px] left-0 bottom-[-600px] bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-20 blur-[100px] transform-gpu"
            />

            <ProjectHeadersSectionHeader subtitle="OUR PHILOSOPHY" title="Built for Performance" />

            <div class="max-w-3xl mx-auto">
                <slot>
                    <p class="text-xl text-muted-foreground leading-relaxed text-center">
                        {{ content }}
                    </p>
                </slot>
            </div>
        </div>
    </section>
</template>
