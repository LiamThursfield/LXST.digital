<script lang="ts" setup>
import Container from '~/components/project/utilities/Container.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import Wordmark from '~/components/project/logos/Wordmark.vue';
import type { LinkWithLabel } from '~/components/project/types';

defineProps<{
    sitemapLinks: Array<LinkWithLabel>;
    elsewhereLinks: Array<LinkWithLabel>;
}>();

const currentYear = new Date().getFullYear();

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
</script>

<template>
    <!-- The giant wordmark is ~4.9em wide, so size it to always fill (but never overflow) the column -->
    <footer
        class="border-t border-border overflow-hidden [--wordmark-size:calc((min(100vw,var(--container-page))-2*var(--spacing-gutter))/5)]"
    >
        <Container class="grid-split [--split-min:13.75rem] gap-10 pt-16">
            <p class="max-w-[26em] text-base text-muted-foreground">
                Every project starts with a conversation. We pair that with careful engineering to
                build anything from a five-page site to a full platform.
            </p>

            <nav aria-labelledby="footer-sitemap" class="flex flex-col gap-1.5 text-base">
                <MonoLabel id="footer-sitemap" class="mb-1.5" tone="subtle">sitemap</MonoLabel>
                <NuxtLink
                    v-for="link in sitemapLinks"
                    :key="link.href"
                    :to="link.href"
                    class="self-start py-1 transition-colors duration-200 ease-out hover:text-highlight"
                >
                    {{ link.label }}
                </NuxtLink>
            </nav>

            <div class="flex flex-col gap-1.5 text-base">
                <MonoLabel class="mb-1.5" tone="subtle">elsewhere</MonoLabel>
                <NuxtLink
                    v-for="link in elsewhereLinks"
                    :key="link.href"
                    :external="isExternal(link.href)"
                    :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
                    :target="link.href.startsWith('http') ? '_blank' : undefined"
                    :to="link.href"
                    class="self-start py-1 transition-colors duration-200 ease-out hover:text-highlight"
                >
                    {{ link.label }}
                </NuxtLink>
            </div>
        </Container>

        <Container aria-hidden="true" class="pt-12 text-(length:--wordmark-size) leading-[0.78]">
            <Wordmark variant="giant" />
        </Container>

        <Container
            class="flex flex-wrap justify-between gap-x-6 gap-y-2 pt-8 pb-7 font-mono text-[0.8125rem] text-subtle-foreground"
        >
            <span>&copy; {{ currentYear }} LXST.digital</span>
            <span>ai-assisted, human-engineered.</span>
        </Container>
    </footer>
</template>
