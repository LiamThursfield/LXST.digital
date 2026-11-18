<script lang="ts" setup>
import type { NuxtError } from '#app';
import PageHero from '~/components/project/headers/PageHero.vue';

const props = defineProps<{
    error: NuxtError;
}>();

const isNotFound = computed(() => props.error.status === 404);

useSeoMeta({
    title: () => (isNotFound.value ? 'Page Not Found' : 'Something Went Wrong') + ' | LXST.digital',
    description: 'The page you are looking for does not exist.'
});
</script>

<template>
    <NuxtLayout>
        <PageHero :label="`~/${error.status ?? 500}`">
            {{ isNotFound ? 'nothing here.' : 'something broke.' }}
            <template #lead>
                {{
                    isNotFound
                        ? "That page doesn't exist, or it's moved."
                        : 'An error occurred on our end. Try again in a moment.'
                }}
                <span class="mt-6 block">
                    <Button as-child size="lg">
                        <NuxtLink to="/">back to home →</NuxtLink>
                    </Button>
                </span>
            </template>
        </PageHero>
    </NuxtLayout>
</template>
