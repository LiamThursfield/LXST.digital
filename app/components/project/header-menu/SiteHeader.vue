<script lang="ts" setup>
import Container from '~/components/project/utilities/Container.vue';
import ThemeToggle from '~/components/project/theme/ThemeToggle.vue';
import Wordmark from '~/components/project/logos/Wordmark.vue';
import type { LinkWithLabel } from '~/components/project/types';

defineProps<{
    links: Array<LinkWithLabel>;
    cta?: LinkWithLabel;
}>();
</script>

<template>
    <header class="border-b border-border">
        <Container
            aria-label="Main"
            as="nav"
            class="flex flex-wrap items-center gap-x-10 gap-y-3 py-5.5"
        >
            <NuxtLink
                aria-label="lxst.digital home"
                class="text-[1.625rem] hover:text-foreground"
                to="/"
            >
                <Wordmark />
            </NuxtLink>

            <!-- Phones: logo and toggle share the top row, links and CTA drop below -->
            <div
                class="order-last flex w-full flex-wrap items-center gap-x-4 gap-y-2 text-base md:order-none md:ml-auto md:w-auto md:gap-x-7"
            >
                <!-- NuxtLink sets aria-current="page" on the exact match -->
                <NuxtLink
                    v-for="link in links"
                    :key="link.href"
                    :to="link.href"
                    class="py-2.5 transition-colors duration-200 ease-out hover:text-highlight aria-[current=page]:underline aria-[current=page]:decoration-highlight aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                >
                    {{ link.label }}
                </NuxtLink>

                <Button
                    v-if="cta"
                    as-child
                    class="ml-auto h-10 px-3 text-sm md:ml-0 md:h-11 md:px-4 md:text-base"
                >
                    <NuxtLink :to="cta.href">{{ cta.label }}</NuxtLink>
                </Button>
            </div>

            <ThemeToggle class="-mr-3 ml-auto md:-ml-6" />
        </Container>
    </header>
</template>
