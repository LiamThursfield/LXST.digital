<script lang="ts" setup>
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError;
}>();

useSeoMeta({
    title: 'Page Not Found | LXST.digital',
    description: 'The page you are looking for does not exist.'
});
</script>

<template>
    <NuxtLayout>
        <div class="flex flex-col">
            <div class="mt-22" />

            <ProjectHeroesHeroWithCTA
                :body="
                    error.status === 404
                        ? 'The page you are looking for does not exist.'
                        : 'An error occurred.'
                "
                :primary-cta="{
                    label: 'Go Home',
                    href: '/'
                }"
                heading="Page Not Found"
                :subheading="error.status?.toString() ?? '404'"
            />
        </div>
    </NuxtLayout>
</template>
