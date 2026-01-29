<script lang="ts" setup>
import TextLogo from '~/components/project/logos/TextLogo.vue';
import HamburgerButton from '~/components/lxst/buttons/HamburgerButton.vue';
import type { HeaderMenuLink } from '~/components/project/types';

defineProps<{
    links: Array<HeaderMenuLink>;
    cta?: HeaderMenuLink;
}>();

let isMobileMenuOpen = ref(false);

/**
 * Toggle the mobile menu, as well as the body class
 */
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;

    if (isMobileMenuOpen.value) {
        document.body.classList.add('mobile-open');
    } else {
        document.body.classList.remove('mobile-open');
    }
};
</script>

<template>
    <div>
        <nav class="fixed top-0 w-full z-100">
            <div class="mx-auto py-6 container px-gutter">
                <div
                    class="backdrop-blur-md bg-background/60 border border-border flex flex-row items-center justify-between px-6 py-2 rounded-full w-full"
                >
                    <NuxtLink class="py-2" href="/">
                        <TextLogo />
                    </NuxtLink>

                    <ul class="flex-row justify-between hidden space-x-2 lg:inline-flex">
                        <li v-for="link in links" :key="link.label">
                            <NuxtLink
                                :to="link.href"
                                class="bg-foreground/0 block cursor-pointer font-semibold px-4 py-2 rounded-full text-center text-foreground hover:bg-foreground/5 hover:text-primary transition-colors duration-300 ease-linear"
                            >
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>

                    <Button
                        v-if="cta != null"
                        as-child
                        class="hidden lg:inline-flex transition-colors duration-300 ease-linear rounded-full"
                        size="lg"
                        variant="outline-primary"
                        @click="toggleMobileMenu"
                    >
                        <NuxtLink
                            class="font-semibold py-5 transition-colors duration-400 ease-linear !text-base"
                            :href="cta.href"
                        >
                            {{ cta.label }}
                        </NuxtLink>
                    </Button>

                    <HamburgerButton
                        :is-active="isMobileMenuOpen"
                        class="block lg:hidden"
                        @click="toggleMobileMenu"
                    />
                </div>
            </div>
        </nav>

        <nav
            :class="{
                open: isMobileMenuOpen
            }"
            class="mobile-menu backdrop-blur-xs bg-background/90 fixed h-screen overflow-y-auto pb-6 right-0 top-0 w-full z-50 lg:hidden"
        >
            <div class="container mx-auto mt-23 pt-6 px-gutter">
                <ul class="mobile-nav-links flex flex-col items-center space-y-4">
                    <li v-for="link in links" :key="link.label" class="w-full">
                        <NuxtLink
                            :to="link.href"
                            class="bg-foreground/0 block cursor-pointer font-semibold px-2 py-2 rounded-full text-center text-foreground text-lg hover:bg-foreground/5 hover:text-primary transition-colors duration-150 ease-in"
                            @click="toggleMobileMenu"
                        >
                            {{ link.label }}
                        </NuxtLink>
                    </li>

                    <li class="w-full">
                        <Button
                            v-if="cta != null"
                            as-child
                            class="py-6 rounded-full"
                            variant="outline-primary"
                            @click="toggleMobileMenu"
                        >
                            <NuxtLink class="font-semibold w-full !text-lg" :href="cta.href">
                                {{ cta.label }}
                            </NuxtLink>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style lang="postcss" scoped>
.mobile-menu {
    transform: translateY(-100%);
    transition: transform 0.4s var(--transition-smooth);

    &.open {
        transform: translateY(0);
    }

    .mobile-nav-links {
        li {
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.4s ease 0.35s;
        }
    }

    &.open {
        .mobile-nav-links {
            li {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
}
</style>
