<script lang="ts" setup>
import TextLogo from '~/components/project/logos/TextLogo.vue';
import type { LinkWithLabel } from '~/components/project/types';

defineProps<{
    siteMapLinks: Array<LinkWithLabel>;
    socialLinks: Array<LinkWithLabel>;
}>();

const currentYear = new Date().getFullYear();
</script>

<template>
    <div>
        <div class="border-border/70 border-t py-20">
            <div class="container mx-auto px-gutter">
                <div class="grid gap-8 lg:grid-cols-2">
                    <div class="flex flex-col space-y-8">
                        <h3><TextLogo /></h3>

                        <p class="max-w-[300px] text-foreground/50">
                            A digital product agency crafting experiences for the modern web. We
                            combine aesthetics with performance and functionality.
                        </p>
                    </div>

                    <div class="grid space-y-6 lg:grid-cols-3">
                        <!-- This will be used if/when we add legal-->
                        <div class="hidden lg:block" />

                        <div>
                            <h3 class="text-lg font-semibold text-foreground">Sitemap</h3>
                            <ul class="flex flex-col mt-6 space-y-3">
                                <li v-for="link in siteMapLinks" :key="link.label">
                                    <NuxtLink
                                        :href="link.href"
                                        class="text-foreground/50 transition-colors duration-300 ease-in-out active:text-primary hover:text-primary"
                                    >
                                        {{ link.label }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 class="text-lg font-semibold text-foreground">Socials</h3>
                            <ul class="flex flex-col mt-6 space-y-3 text-foreground/50">
                                <li v-for="link in socialLinks" :key="link.label">
                                    <NuxtLink
                                        class="text-foreground/50 transition-colors duration-300 ease-in-out active:text-primary hover:text-primary"
                                        :href="link.href"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {{ link.label }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-border/70 border-t py-10">
            <div class="container mx-auto px-gutter text-center text-sm text-foreground/50">
                <p>&copy; {{ currentYear }} LXST.digital - All rights reserved</p>
            </div>
        </div>
    </div>
</template>

<style lang="postcss" scoped></style>
