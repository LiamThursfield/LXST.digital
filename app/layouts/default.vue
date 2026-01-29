<script lang="ts" setup>
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

let socialLinks: Array<LinkWithLabel> = [
    {
        label: 'Instagram',
        href: 'https://instagram.co/lxst.digital'
    },
    {
        label: 'Facebook',
        href: '#'
    },
    {
        label: 'Twitter/X',
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
        <div class="relative">
            <ProjectHeaderMenu :links="links" :cta="primaryCta" />

            <!-- Header Spacer -->
            <div class="mt-22" />

            <slot />

            <ProjectFooter :site-map-links="links" :social-links="socialLinks" />
        </div>
    </div>
</template>

<style lang="postcss" scoped></style>
