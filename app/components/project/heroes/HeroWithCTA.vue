<script lang="ts" setup>
import type { LinkWithLabel } from '~/components/project/types';

defineProps<{
    heading: string;
    subheading: string;
    primaryCta: LinkWithLabel;
    secondaryCta?: LinkWithLabel;
}>();
</script>

<template>
    <section class="container mx-auto overflow-hidden px-gutter py-16 relative lg:py-36">
        <div class="absolute overflow-hidden inset-0">
            <div
                class="absolute w-full h-full bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-25 transform-gpu"
            />
        </div>

        <div class="flex flex-col items-center relative">
            <h2 class="font-semibold text-center text-primary tracking-wider">{{ subheading }}</h2>

            <h1
                class="font-bold mt-2 text-5xl text-center text-foreground/90 lg:max-w-240 lg:text-7xl"
            >
                {{ heading }}
            </h1>

            <p class="max-w-lg mt-6 mx-auto text-center text-foreground/60 text-lg lg:text-xl">
                We build high-performance websites and digital products for brands that are ready to
                lead their industry.
            </p>

            <div
                class="flex flex-col mt-12 mx-auto space-y-4 w-full lg:inline-flex lg:flex-row lg:space-x-4 lg:w-auto"
            >
                <Button
                    as-child
                    class="inline-flex transition-colors duration-300 ease-linear rounded-full"
                    size="lg"
                    variant="outline-primary"
                >
                    <NuxtLink
                        class="bg-background/20 font-semibold transition-colors duration-400 ease-linear !text-base py-6 lg:px-16"
                        :href="primaryCta.href"
                    >
                        {{ primaryCta.label }}
                    </NuxtLink>
                </Button>

                <Button
                    v-if="secondaryCta != null"
                    as-child
                    class="inline-flex transition-colors duration-300 ease-linear rounded-full"
                    size="lg"
                    variant="ghost"
                >
                    <NuxtLink
                        class="bg-background/60 border font-semibold transition-colors duration-400 ease-linear !text-base py-6 lg:px-16"
                        :href="secondaryCta.href"
                    >
                        {{ secondaryCta.label }}
                    </NuxtLink>
                </Button>
            </div>
        </div>
    </section>
</template>

<style lang="postcss" scoped></style>
