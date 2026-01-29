<script lang="ts" setup>
import HeaderMenu from '~/components/project/header-menu/HeaderMenu.vue';
</script>

<template>
    <div class="min-h-screen flex flex-col relative">
        <div class="absolute overflow-x-hidden inset-0">
            <div
                class="absolute w-[200vw] h-[100vw] top-[-80vw] left-[-50vw] bg-[radial-gradient(closest-side,var(--color-primary),transparent)] opacity-20 blur-[100px] transform-gpu"
            />
        </div>

        <HeaderMenu />

        <!-- Header Spacer -->
        <div class="mt-22" />

        <slot />
    </div>
</template>

<style lang="postcss" scoped></style>
