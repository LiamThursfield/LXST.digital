<script lang="ts" setup>
import SiteFooter from '~/components/project/footer/SiteFooter.vue';
import SiteHeader from '~/components/project/header-menu/SiteHeader.vue';
import { useNavigation } from '~/composables/project/navigation';
import { useCmsPage, useSiteLayout } from '~/composables/project/cms';

const { mainLinks, primaryCta, sitemapLinks, elsewhereLinks } = useNavigation();

// The Site layout's content comes with the current page (the page fetches it too, sharing the
// request). Pages keep it up to date as you navigate.
const siteLayout = useSiteLayout();
const { data: currentPage } = await useCmsPage(useRoute().path);
if (currentPage.value?.type === 'page') {
    siteLayout.value = currentPage.value.layout.content;
}
const footerBlurb = computed(
    () =>
        siteLayout.value?.footer_blurb ||
        'Every project starts with a conversation. We pair that with careful engineering to build anything from a five-page site to a full platform.'
);

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

        <SiteFooter
            :blurb="footerBlurb"
            :elsewhere-links="elsewhereLinks"
            :sitemap-links="sitemapLinks"
        />
    </div>
</template>
