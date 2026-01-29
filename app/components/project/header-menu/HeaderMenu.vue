<script lang="ts" setup>
import TextLogo from '~/components/project/logos/TextLogo.vue';
import HamburgerButton from '~/components/lxst/buttons/HamburgerButton.vue';

let isMobileMenuOpen = ref(false);

let links: Array<{ label: string; href: string }> = [
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
</script>

<template>
    <div>
        <nav class="fixed top-0 w-full z-100">
            <div class="mx-auto py-6 container">
                <div
                    class="backdrop-blur-sm bg-background/60 border border-border flex flex-row items-center justify-between px-6 py-4 rounded-full w-full"
                >
                    <NuxtLink href="/">
                        <TextLogo />
                    </NuxtLink>

                    <ul class="flex-row justify-between hidden space-x-6 md:inline-flex">
                        <li v-for="link in links" :key="link.label">
                            <NuxtLink
                                :to="link.href"
                                class="block bg-foreground/0 cursor-pointer font-semibold py-4 px-6 rounded-full text-center text-foreground transition-colors duration-300 ease-linear hover:text-primary hover:bg-foreground/5"
                                @click="isMobileMenuOpen = !isMobileMenuOpen"
                            >
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>

                    <Button
                        as-child
                        size="lg"
                        variant="outline-primary"
                        class="hidden md:inline-flex transition-colors duration-300 ease-linear rounded-full"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                    >
                        <NuxtLink
                            href="/#"
                            class="font-semi-bold py-7 transition-colors duration-400 ease-linear !text-lg"
                        >
                            Start Project
                        </NuxtLink>
                    </Button>

                    <HamburgerButton
                        class="block md:hidden"
                        :is-active="isMobileMenuOpen"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                    />
                </div>
            </div>
        </nav>

        <nav
            class="mobile-menu fixed top-0 right-0 bg-background/90 z-50 w-full h-screen backdrop-blur-sm md:hidden"
            :class="{
                open: isMobileMenuOpen
            }"
        >
            <div class="container mx-auto mt-23 pt-6">
                <ul class="mobile-nav-links flex flex-col items-center space-y-4">
                    <li v-for="link in links" :key="link.label" class="w-full">
                        <NuxtLink
                            :to="link.href"
                            class="block bg-foreground/0 cursor-pointer font-semibold py-2 rounded-full text-center text-xl text-foreground transition-colors duration-150 ease-in hover:text-primary hover:bg-foreground/5"
                            @click="isMobileMenuOpen = !isMobileMenuOpen"
                        >
                            {{ link.label }}
                        </NuxtLink>
                    </li>

                    <li class="w-full">
                        <Button
                            as-child
                            class="py-6 rounded-full"
                            @click="isMobileMenuOpen = !isMobileMenuOpen"
                        >
                            <NuxtLink href="/#" class="font-semi-bold w-full text-xl">
                                Start Project
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
