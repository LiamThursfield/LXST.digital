<script setup lang="ts">
import MediaFrame from '~/components/project/utilities/MediaFrame.vue';
import MetaList from '~/components/project/utilities/MetaList.vue';
import MonoLabel from '~/components/project/utilities/MonoLabel.vue';
import type { MetaItem } from '~/components/project/utilities/MetaList.vue';
import type { Project } from '~/composables/project/data';

const props = defineProps<{
    project: Project;
    /** e.g. `01 / 03` */
    number: string;
}>();

const meta = computed<Array<MetaItem>>(() => [
    { term: 'type', value: props.project.type, highlight: true },
    ...(props.project.year ? [{ term: 'year', value: props.project.year }] : []),
    ...(props.project.stack ? [{ term: 'stack', value: props.project.stack }] : [])
]);
</script>

<template>
    <!-- A project on the work page: image left, details right -->
    <article class="flex flex-wrap items-start gap-x-14 gap-y-7 border-t border-border py-12">
        <MediaFrame
            :alt="`${project.name} screenshot`"
            :src="project.image"
            class="aspect-16/10 min-w-0 flex-[3_1_32.5rem]"
        />

        <div class="flex flex-[2_1_18.75rem] flex-col gap-3.5">
            <MonoLabel>{{ number }}</MonoLabel>
            <h2 class="text-title font-bold">{{ project.name }}</h2>
            <p class="text-foreground-soft">{{ project.blurb }}</p>
            <MetaList :items="meta" class="mt-2" />
            <NuxtLink
                :target="project.external ? '_blank' : undefined"
                :to="project.href"
                class="mt-2 self-start py-2.5 text-[1.0625rem] underline decoration-highlight underline-offset-6 transition-colors hover:text-highlight"
            >
                {{ project.cta }}
            </NuxtLink>
        </div>
    </article>
</template>
