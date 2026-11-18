<script setup lang="ts">
withDefaults(defineProps<{ as?: string }>(), {
    as: 'div'
});
</script>

<template>
    <!-- Page-width column with the responsive side gutter -->
    <component :is="as" class="mx-auto w-full max-w-page px-gutter">
        <slot />
    </component>
</template>
