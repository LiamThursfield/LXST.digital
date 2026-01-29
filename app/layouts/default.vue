<script lang="ts" setup>
import HeaderMenu from '~/components/project/header-menu/HeaderMenu.vue';
import type { LinkWithLabel } from '~/components/project/types';

let links: Array<LinkWithLabel> = [
    {
        label: 'Services',
        href: '#'
    },
    {
        label: 'Work',
        href: '#'
    },
    {
        label: 'About',
        href: '#'
    },
    {
        label: 'Contact',
        href: '#'
    }
];

let primaryCta = {
    label: 'Get Started',
    href: '#'
};
</script>

<template>
    <div class="min-h-screen flex flex-col relative">
        <div class="absolute overflow-x-hidden inset-0">
            <div
                class="absolute w-[200vw] h-[100vw] top-[-80vw] left-[-50vw] bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-20 blur-[100px] transform-gpu"
            />
        </div>

        <HeaderMenu :links="links" :cta="primaryCta" />

        <!-- Header Spacer -->
        <div class="mt-22" />

        <slot />
    </div>
</template>

<style lang="postcss" scoped></style>
