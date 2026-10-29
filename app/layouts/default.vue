<script lang="ts" setup>
import SiteFooter from '~/components/project/footer/SiteFooter.vue';
import SiteHeader from '~/components/project/header-menu/SiteHeader.vue';
import { useNavigation } from '~/composables/project/navigation';

const { mainLinks, primaryCta, sitemapLinks, elsewhereLinks } = useNavigation();

onMounted(() => {
    // Adding an empty listener to the body enables :active styles in iOS Safari
    document.body.addEventListener('touchstart', () => {}, { passive: true });
});
onBeforeUnmount(() => {
    document.body.removeEventListener('touchstart', () => {});
});
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <SiteHeader :cta="primaryCta" :links="mainLinks" />

        <main class="flex-1">
            <slot />
        </main>

        <SiteFooter :elsewhere-links="elsewhereLinks" :sitemap-links="sitemapLinks" />
    </div>
</template>
