<script setup lang="ts">
import MediaFrame from '~/components/project/utilities/MediaFrame.vue';
import type { Project } from '~/composables/project/data';

const props = withDefaults(
    defineProps<{
        project: Project;
        /**
         * `feature`: wide image with text alongside (home page lead project).
         * `tile`: image above text, for a grid.
         */
        variant?: 'feature' | 'tile';
    }>(),
    {
        variant: 'tile'
    }
);

const eyebrow = computed(() =>
    [props.project.type, props.project.year].filter(Boolean).join(' · ')
);
</script>

<template>
    <NuxtLink
        :class="
            variant === 'feature'
                ? 'flex flex-wrap items-end gap-x-12 gap-y-6'
                : 'flex flex-col gap-3.5'
        "
        :target="project.external ? '_blank' : undefined"
        :to="project.href"
        class="group"
    >
        <MediaFrame
            :alt="`${project.name} screenshot`"
            :class="variant === 'feature' ? 'aspect-16/10 min-w-0 flex-[2_1_35rem]' : 'aspect-4/3'"
            :src="project.image"
        />

        <div
            :class="{ 'flex-[1_1_18.75rem] pb-2': variant === 'feature' }"
            class="flex flex-col gap-3"
        >
            <span class="font-mono text-[0.8125rem] text-highlight">{{ eyebrow }}</span>
            <span
                :class="variant === 'feature' ? 'text-[clamp(1.875rem,3.4vw,2.75rem)]' : 'text-3xl'"
                class="font-bold leading-[1.05] tracking-[-0.03em]"
            >
                {{ project.name }}<template v-if="project.external"> ↗</template>
            </span>
            <span class="text-[1.0625rem] text-muted-foreground">{{ project.summary }}</span>
            <span
                v-if="variant === 'feature'"
                class="mt-2 text-base underline decoration-highlight underline-offset-6"
            >
                {{ project.cta }}
            </span>
        </div>
    </NuxtLink>
</template>
