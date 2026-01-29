<script lang="ts" setup>
import HeroWithCta from '~/components/project/heroes/HeroWithCta.vue';
</script>

<template>
    <div class="flex flex-col">
        <HeroWithCta
            heading="Crafting Digital Experiences That Define the Future"
            subheading="DIGITAL PRODUCT AGENCY"
            :primary-cta="{
                label: 'Get Started',
                href: '#'
            }"
            :secondary-cta="{
                label: 'Our Work',
                href: '#'
            }"
        />
    </div>
</template>

<style lang="postcss" scoped></style>
