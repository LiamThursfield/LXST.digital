<script lang="ts" setup>
interface Project {
    title: string;
    type: string;
    description: string;
    image?: string;
    link?: string;
}

interface Props {
    project: Project;
}

const props = defineProps<Props>();

const hasLink = computed(() => !!props.project.link);
</script>

<template>
    <NuxtLink
        :to="hasLink ? project.link : '#'"
        :target="hasLink ? '_blank' : '_self'"
        :rel="hasLink ? 'noopener noreferrer' : ''"
        class="group relative overflow-hidden rounded border border-border bg-card h-full flex flex-col"
        :class="{ 'cursor-default': !hasLink }"
    >
        <!-- Image Container -->
        <div class="aspect-video w-full bg-muted overflow-hidden relative">
            <NuxtImg
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-300 group-active:scale-105 group-hover:scale-105"
            />
            <div
                v-else
                class="w-full h-full flex items-center justify-center bg-muted text-muted-foreground"
            >
                <span class="text-sm font-medium uppercase tracking-wider">Coming Soon</span>
            </div>

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-black/0 group-active:bg-black/10 group-hover:bg-black/10 transition-colors duration-300 dark:group-active:bg-white/5 dark:group-hover:bg-white/5"
            />
        </div>

        <!-- Content -->
        <div class="p-6 flex flex-col flex-grow">
            <div class="mb-3 flex items-center justify-between">
                <span class="text-xs font-semibold uppercase tracking-wider text-primary">
                    {{ project.type }}
                </span>
            </div>

            <h3
                class="text-2xl font-bold mb-3 text-foreground group-active:text-primary group-hover:text-primary transition-colors"
            >
                {{ project.title }}
            </h3>

            <p class="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {{ project.description }}
            </p>

            <div
                v-if="project.link"
                class="flex items-center text-sm font-medium text-foreground group-active:text-primary group-hover:text-primary transition-colors mt-auto"
            >
                View Project
                <span
                    class="ml-2 transform group-active:translate-x-1 group-hover:translate-x-1 transition-transform"
                    >→</span
                >
            </div>
        </div>
    </NuxtLink>
</template>
