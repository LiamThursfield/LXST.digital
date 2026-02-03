<script setup lang="ts">
interface Props {
    verticalPadding?: boolean;
}

withDefaults(defineProps<Props>(), {
    verticalPadding: true
});
</script>

<template>
    <section :class="{ 'py-24': verticalPadding }" class="px-4">
        <div class="container mx-auto max-w-content-container space-y-24">
            <slot />
        </div>
    </section>
</template>

<style lang="postcss" scoped></style>
